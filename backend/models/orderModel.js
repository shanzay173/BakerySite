import { getDB } from '../config/db.js'

const COLLECTION = 'orders'

function generateOrderId() {
  return `BAK-${Math.floor(10000 + Math.random() * 89999)}`
}

export function buildOrderDocument(orderData) {
  const now = new Date()

  return {
    orderId: generateOrderId(),
    status: 'Pending',
    customer: orderData.customer,
    payment: orderData.payment,
    items: orderData.items,
    subtotal: orderData.subtotal,
    deliveryFee: orderData.deliveryFee,
    total: orderData.total,
    currency: 'PKR',
    deliveryZone: orderData.deliveryZone,
    deliveryCity: orderData.deliveryCity,
    etaLabel: orderData.etaLabel,
    customCakeNote: orderData.customCakeNote || null,
    dateLabel: now.toLocaleDateString([], {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    createdAt: now,
    updatedAt: now,
  }
}

export async function insertOrder(order) {
  const collection = getDB().collection(COLLECTION)
  await collection.createIndex({ orderId: 1 }, { unique: true })

  for (let attempt = 0; attempt < 5; attempt += 1) {
    try {
      const result = await collection.insertOne(order)
      return { ...order, _id: result.insertedId }
    } catch (error) {
      if (error.code !== 11000) throw error
      order.orderId = generateOrderId()
    }
  }

  throw new Error('Could not allocate a unique order id')
}
