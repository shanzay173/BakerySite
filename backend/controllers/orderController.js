import { ObjectId } from 'mongodb'
import { getDB } from '../config/db.js'
import { getDeliveryFee } from '../config/pricing.js'
import { getZoneForCity } from '../config/delivery.js'
import { buildOrderDocument, insertOrder } from '../models/orderModel.js'
import { sendOrderEmails } from '../services/emailService.js'

const EMAIL_REGEX = /^\S+@\S+\.\S+$/
const PHONE_REGEX = /^[+\d][\d\s\-()]{5,19}$/

function validateCustomer(customer) {
  const errors = []

  if (!customer || typeof customer !== 'object') {
    return ['Customer information is required.']
  }

  if (String(customer.name ?? '').trim().length < 2) errors.push('Full name is required.')
  if (!EMAIL_REGEX.test(String(customer.email ?? '').trim()))
    errors.push('A valid email address is required.')
  if (!PHONE_REGEX.test(String(customer.phone ?? '').trim()))
    errors.push('A valid phone number is required.')
  if (!String(customer.address ?? '').trim()) errors.push('Delivery address is required.')
  if (!String(customer.city ?? '').trim()) errors.push('City is required.')
  if (!String(customer.postalCode ?? '').trim()) errors.push('Postal code is required.')

  return errors
}

function validateItems(items) {
  if (!Array.isArray(items) || items.length === 0) return ['Your cart is empty.']
  if (items.length > 50) return ['Too many items in a single order.']

  for (const item of items) {
    if (!ObjectId.isValid(item?.productId)) return ['One of the products in your cart is invalid.']
    const quantity = Number(item?.quantity)
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99)
      return ['Product quantities must be between 1 and 99.']
    if (item?.variantLabel != null && typeof item.variantLabel !== 'string')
      return ['Invalid product option selected.']
  }

  return []
}

function round2(value) {
  return Math.round(value * 100) / 100
}

async function priceOrderItems(items, zone) {
  const collection = getDB().collection('Products')
  const ids = items.map((item) => new ObjectId(item.productId))
  const products = await collection.find({ _id: { $in: ids } }).toArray()
  const productMap = new Map(products.map((product) => [product._id.toString(), product]))

  const pricedItems = []
  const lahoreOnlyNames = []
  let subtotal = 0
  let containsCakes = false

  for (const item of items) {
    const product = productMap.get(item.productId)
    if (!product) throw new Error('One of the products in your order no longer exists.')
    if (product.availability === false)
      throw new Error(`"${product.name}" is currently unavailable.`)

    if (zone.id !== 'home' && product.courierAllowed !== true) {
      lahoreOnlyNames.push(product.name)
      continue
    }

    if (product.category === 'Cakes') containsCakes = true

    let unitPrice
    let variantLabel = null

    if (Array.isArray(product.variants) && product.variants.length > 0) {
      const requested =
        item.variantLabel == null
          ? product.variants[0]
          : product.variants.find((variant) => variant.label === item.variantLabel)
      if (!requested)
        throw new Error(`The selected option for "${product.name}" is no longer available.`)
      unitPrice = Number(requested.price)
      variantLabel = requested.label
    } else {
      unitPrice = Number(product.price)
    }

    if (!Number.isFinite(unitPrice)) throw new Error(`Pricing for "${product.name}" is invalid.`)

    const lineTotal = round2(unitPrice * item.quantity)
    subtotal += lineTotal

    pricedItems.push({
      productId: product._id,
      name: product.name,
      image: product.image || null,
      category: product.category || null,
      variantLabel,
      unitPrice: round2(unitPrice),
      quantity: item.quantity,
      lineTotal,
    })
  }

  subtotal = round2(subtotal)
  const deliveryFee = getDeliveryFee(subtotal)

  return {
    pricedItems,
    subtotal,
    deliveryFee,
    total: round2(subtotal + deliveryFee),
    lahoreOnlyNames,
    containsCakes,
  }
}

export async function createOrder(req, res) {
  try {
    const { customer, payment = 'cod', items } = req.body ?? {}

    const validationErrors = [...validateCustomer(customer), ...validateItems(items)]
    if (validationErrors.length > 0) {
      return res.status(400).json({ error: 'Validation failed', details: validationErrors })
    }

    if (!['cod', 'online'].includes(payment)) {
      return res.status(400).json({ error: 'Validation failed', details: ['Invalid payment method.'] })
    }

    const city = String(customer.city).trim()
    const zone = getZoneForCity(city)

    const pricing = await priceOrderItems(items, zone).catch((error) => {
      throw Object.assign(error, { statusCode: 400 })
    })

    if (pricing.lahoreOnlyNames.length > 0) {
      return res.status(400).json({
        error: 'Sorry, this product is available for Lahore delivery only.',
        details: pricing.lahoreOnlyNames,
      })
    }

    if (pricing.pricedItems.length === 0) {
      return res.status(400).json({ error: 'Your cart is empty.' })
    }

    const order = buildOrderDocument({
      customer: {
        name: String(customer.name).trim(),
        email: String(customer.email).trim(),
        phone: String(customer.phone).trim(),
        address: String(customer.address).trim(),
        city,
        postalCode: String(customer.postalCode).trim(),
        notes: String(customer.notes ?? '').trim() || null,
      },
      payment,
      items: pricing.pricedItems,
      subtotal: pricing.subtotal,
      deliveryFee: pricing.deliveryFee,
      total: pricing.total,
      deliveryZone: zone.id,
      deliveryCity: zone.label,
      etaLabel: zone.etaLabel,
      customCakeNote:
        zone.sameDay && pricing.containsCakes ? zone.customCakeNote : null,
    })

    let savedOrder
    try {
      savedOrder = await insertOrder(order)
    } catch (error) {
      console.error('Failed to save order to MongoDB:', error)
      return res.status(500).json({
        error: "Sorry, we couldn't place your order right now. Please try again.",
      })
    }

    const {
      orderId,
      status,
      subtotal,
      deliveryFee,
      total,
      currency,
      dateLabel,
      etaLabel,
      deliveryZone,
      customCakeNote,
    } = savedOrder

    const emailResult = await sendOrderEmails(savedOrder)

    return res.status(201).json({
      message: 'Order placed successfully',
      emailSent: emailResult.customerSent,
      ownerNotified: emailResult.ownerSent,
      order: {
        orderId,
        status,
        payment,
        customer: savedOrder.customer,
        items: savedOrder.items,
        subtotal,
        deliveryFee,
        total,
        currency,
        dateLabel,
        etaLabel,
        deliveryZone,
        customCakeNote,
        createdAt: savedOrder.createdAt,
      },
    })
  } catch (error) {
    if (error.statusCode === 400) {
      return res.status(400).json({ error: error.message })
    }
    console.error('Unexpected error while creating order:', error)
    return res.status(500).json({
      error: "Sorry, we couldn't place your order right now. Please try again.",
    })
  }
}
