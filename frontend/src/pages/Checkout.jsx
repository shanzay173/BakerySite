import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button.jsx'
import FormInput from '../components/FormInput.jsx'
import OrderSummary from '../components/OrderSummary.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import { ArrowRightIcon, CheckIcon } from '../components/icons.jsx'
import { useCart } from '../context/useCart.js'
import { apiUrl } from '../utils/api.js'
import {
  DELIVERY_FEE_ABOVE_THRESHOLD,
  DELIVERY_FEE_THRESHOLD,
  DELIVERY_FEE_UNDER_THRESHOLD,
  formatPrice,
  getDeliveryFee,
  getZoneForCity,
} from '../utils/pricing.js'

const initialForm = {
  name: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  postalCode: '',
  notes: '',
}

const requiredFields = {
  name: 'Full name',
  phone: 'Phone number',
  email: 'Email',
  address: 'Delivery address',
  city: 'City',
  postalCode: 'Postal code',
}

function validate(form) {
  const errors = {}
  Object.entries(requiredFields).forEach(([key, label]) => {
    if (!form[key].trim()) errors[key] = `${label} is required.`
  })
  if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) {
    errors.email = 'Please enter a valid email address.'
  }
  return errors
}

export default function Checkout() {
  const navigate = useNavigate()
  const { items, subtotal, clearCart } = useCart()
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const zone = getZoneForCity(form.city)
  const zoneKnown = form.city.trim().length > 0
  const lahoreOnlyItems = items.filter((item) => item.lahoreOnly === true)
  const deliveryBlocked = zoneKnown && !zone.sameDay && lahoreOnlyItems.length > 0
  const hasCakes = items.some((item) => item.category === 'Cakes')

  const delivery = getDeliveryFee(subtotal)
  const total = subtotal + delivery

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validation = validate(form)
    setErrors(validation)
    if (Object.keys(validation).length > 0) {
      document.querySelector('[aria-invalid="true"]')?.focus()
      return
    }

    if (deliveryBlocked) {
      setSubmitError('Sorry, this product is available for Lahore delivery only.')
      return
    }

    setSubmitting(true)
    setSubmitError(null)

    try {
      const res = await fetch(apiUrl('/api/orders'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: { ...form },
          payment: 'cod',
          items: items.map((item) => ({
            productId: item.id,
            name: item.name,
            variantLabel: item.variantLabel ?? null,
            quantity: item.quantity,
          })),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.order) {
        throw new Error(
          data.error ||
            "Sorry, we couldn't place your order right now. Please try again.",
        )
      }

      clearCart()
      navigate('/order-success', { state: { order: data.order } })
    } catch (err) {
      setSubmitError(
        err.message || "Sorry, we couldn't place your order right now. Please try again.",
      )
    } finally {
      setSubmitting(false)
    }
  }

  if (items.length === 0) {
    return (
      <>
        <PageHeader eyebrow="Almost there" title="Checkout" />
        <section className="pb-20 lg:pb-28">
          <div className="container-px text-center">
            <div className="mx-auto max-w-xl rounded-4xl border border-sage/20 bg-cream p-14 shadow-card">
              <p className="font-serif text-2xl font-semibold text-forest">
                Nothing to checkout yet
              </p>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-forest/65">
                Add a few treats to your cart first, then come back to place your order.
              </p>
              <Button as="link" to="/menu" className="group mt-8">
                Browse the Menu
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <PageHeader
        eyebrow="Almost there"
        title="Checkout"
        subtitle="A few details and your order will be on its way to the oven."
      />

      <section className="pb-20 lg:pb-28">
        <div className="container-px grid items-start gap-10 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-4xl border border-sage/20 bg-cream p-7 shadow-card sm:p-10"
            >
              <h2 className="font-serif text-xl font-semibold text-forest">
                Delivery Information
              </h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <FormInput
                  label="Full Name"
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Jane Baker"
                  autoComplete="name"
                  error={errors.name}
                />
                <FormInput
                  label="Phone Number"
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  autoComplete="tel"
                  error={errors.phone}
                />
                <div className="sm:col-span-2">
                  <FormInput
                    label="Email"
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="jane@example.com"
                    autoComplete="email"
                    error={errors.email}
                  />
                </div>
                <div className="sm:col-span-2">
                  <FormInput
                    label="Delivery Address"
                    id="address"
                    name="address"
                    type="text"
                    required
                    value={form.address}
                    onChange={handleChange}
                    placeholder="128 Maple Lane"
                    autoComplete="street-address"
                    error={errors.address}
                  />
                </div>
                <div>
                  <FormInput
                    label="City"
                    id="city"
                    name="city"
                    type="text"
                    required
                    list="city-options"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="Lahore"
                    autoComplete="address-level2"
                    error={errors.city}
                  />
                  <datalist id="city-options">
                    <option value="Lahore" />
                    <option value="Karachi" />
                    <option value="Islamabad" />
                    <option value="Rawalpindi" />
                    <option value="Faisalabad" />
                    <option value="Multan" />
                    <option value="Gujranwala" />
                    <option value="Sialkot" />
                    <option value="Bahawalpur" />
                    <option value="Sargodha" />
                  </datalist>
                </div>
                <FormInput
                  label="Postal Code"
                  id="postalCode"
                  name="postalCode"
                  type="text"
                  required
                  value={form.postalCode}
                  onChange={handleChange}
                  placeholder="90210"
                  autoComplete="postal-code"
                  error={errors.postalCode}
                />
                <div className="sm:col-span-2">
                  <FormInput
                    label="Order Notes"
                    id="notes"
                    name="notes"
                    textarea
                    rows="4"
                    value={form.notes}
                    onChange={handleChange}
                    placeholder="Allergies, gift note, preferred delivery time..."
                  />
                </div>
              </div>

              <h2 className="mt-10 font-serif text-xl font-semibold text-forest">
                Payment Method
              </h2>
              <div className="mt-5">
                <div className="flex items-start gap-3 rounded-2xl border border-forest bg-sage/15 p-5 shadow-soft">
                  <span
                    className="mt-1 h-4 w-4 shrink-0 rounded-full border-[5px] border-forest bg-cream"
                    aria-hidden="true"
                  />
                  <span>
                    <span className="block text-sm font-semibold text-forest">
                      Cash on Delivery
                    </span>
                    <span className="mt-0.5 block text-xs text-forest/55">
                      Pay with cash when your order arrives at your door.
                    </span>
                  </span>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="mt-10 w-full"
                disabled={submitting || deliveryBlocked}
              >
                {submitting ? 'Placing Order…' : `Place Order · ${formatPrice(total)}`}
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
              {deliveryBlocked && (
                <div
                  role="alert"
                  className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium leading-relaxed text-red-600"
                >
                  Sorry, this product is available for Lahore delivery only.
                  <span className="mt-1 block text-xs font-normal text-red-500/90">
                    {lahoreOnlyItems.map((item) => item.name).join(', ')} can&apos;t be shipped
                    outside Lahore. Remove {lahoreOnlyItems.length > 1 ? 'them' : 'it'} or deliver
                    within Lahore.
                  </span>
                </div>
              )}
              {submitError && (
                <div
                  role="alert"
                  className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium leading-relaxed text-red-600"
                >
                  {submitError}
                </div>
              )}
              <p className="mt-4 text-center text-xs leading-relaxed text-forest/55">
                Pay in cash when your order is delivered to your door.
              </p>
            </form>
          </Reveal>

          <Reveal delay={140} className="lg:col-span-2 lg:sticky lg:top-24">
            <OrderSummary
              items={items}
              subtotal={subtotal}
              delivery={delivery}
              total={total}
              showItems
              className="lg:p-8"
            >
              <div className="mt-7 rounded-2xl bg-sage/15 px-5 py-4 text-xs leading-relaxed text-forest/70">
                <span className="flex items-center gap-2 font-semibold text-forest">
                  <CheckIcon className="h-4 w-4" />
                  {zoneKnown ? zone.etaLabel : 'Same Day Delivery in Lahore (2–4 hours)'}
                </span>
                {zoneKnown && !zone.sameDay
                  ? 'Shipped by courier — only baked goods that travel well are included.'
                  : 'Every order is baked fresh and delivered the same day.'}
                {(!zoneKnown || zone.sameDay) && hasCakes && (
                  <span className="mt-1 block">Custom cakes require 1–2 days advance order.</span>
                )}
              </div>
              <div className="mt-3 rounded-2xl border border-sage/20 px-5 py-4 text-xs leading-relaxed text-forest/60">
                Delivery: Rs. {DELIVERY_FEE_UNDER_THRESHOLD} for orders up to Rs.{' '}
                {DELIVERY_FEE_THRESHOLD.toLocaleString()} · Rs. {DELIVERY_FEE_ABOVE_THRESHOLD} above.
              </div>
            </OrderSummary>
          </Reveal>
        </div>
      </section>
    </>
  )
}
