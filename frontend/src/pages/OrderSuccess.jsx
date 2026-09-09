import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Button from '../components/Button.jsx'
import ProductImage from '../components/ProductImage.jsx'
import { CheckIcon } from '../components/icons.jsx'
import { loadOrder } from '../utils/orders.js'
import { formatPrice } from '../utils/pricing.js'
import { itemKey } from '../context/cartContext.js'

export default function OrderSuccess() {
  const location = useLocation()
  const [legacyOrder] = useState(() => loadOrder())
  const order = location.state?.order ?? legacyOrder

  const orderIdLabel = order ? order.orderId ? `#${order.orderId}` : order.orderNumber : null
  const deliveryFee = order?.deliveryFee ?? order?.delivery ?? 0
  const etaLabel =
    order?.etaLabel ??
    (order?.deliveryZone === 'courier'
      ? '2–4 working days'
      : 'Same Day Delivery (2–4 hours)')

  return (
    <section className="bg-beige/50 pb-20 pt-28 lg:pb-28 lg:pt-36">
      <div className="container-px">
        <div className="mx-auto max-w-2xl">
          <div className="overflow-hidden rounded-4xl border border-sage/20 bg-cream text-center shadow-soft">
            <div className="relative bg-forest bg-cta-radial px-6 py-14 text-cream sm:px-12">
              <div
                className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full border border-sage/30"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -bottom-14 -right-10 h-36 w-36 rounded-full border-2 border-dashed border-sage/25"
                aria-hidden="true"
              />
              <span className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-sage text-forest shadow-glow animate-bounce-slow">
                <CheckIcon className="h-11 w-11" />
              </span>
              <h1 className="relative mt-7 font-serif text-4xl font-semibold sm:text-5xl">
                Thank You for Your Order!
              </h1>
              <p className="relative mt-3 text-base text-cream/75 sm:text-lg">
                Your order has been placed successfully.
              </p>
              <p className="relative mt-5 inline-block rounded-full bg-cream/10 px-6 py-2 font-serif text-lg font-semibold tracking-wide text-sage-light">
                {orderIdLabel ?? '#BAK-00000'}
              </p>
            </div>

            {order ? (
              <div className="px-6 py-8 text-left sm:px-12 sm:py-10">
                {order.emailSent !== false && order.customer?.email && (
                  <p
                    role="status"
                    className="mb-7 rounded-2xl bg-sage/15 px-5 py-4 text-center text-sm leading-relaxed text-forest/75"
                  >
                    A confirmation email has been sent to{' '}
                    <span className="font-semibold text-forest">{order.customer.email}</span>.
                  </p>
                )}

                <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-sage-dark">
                      Customer
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-forest">{order.customer.name}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-sage-dark">
                      Order date
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-forest">
                      {order.dateLabel ??
                        (order.date ? new Date(order.date).toLocaleDateString() : '')}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-sage-dark">
                      Estimated delivery
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-forest">{etaLabel}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-sage-dark">
                      Payment
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-forest">
                      Cash on delivery
                    </dd>
                  </div>
                </dl>

                <div className="mt-8">
                  <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-sage-dark">
                    Your order
                  </h2>
                  <ul className="mt-4 space-y-4">
                    {order.items.map((item) => (
                      <li
                        key={itemKey(item)}
                        className="flex items-center gap-4 rounded-2xl border border-sage/20 p-4"
                      >
                        <span className="block h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                          <ProductImage product={item} className="h-full w-full" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-forest">{item.name}</p>
                          <p className="text-xs text-forest/55">
                            {item.variantLabel ? `${item.variantLabel} · ` : ''}Qty ×{item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-forest">
                          {formatPrice(item.lineTotal ?? item.price * item.quantity)}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

                <dl className="mt-8 space-y-2 border-t border-sage/25 pt-6 text-sm">
                  <div className="flex justify-between text-forest/70">
                    <dt>Subtotal</dt>
                    <dd className="font-medium text-forest">{formatPrice(order.subtotal)}</dd>
                  </div>
                  <div className="flex justify-between text-forest/70">
                    <dt>Delivery fee</dt>
                    <dd className="font-medium text-forest">{formatPrice(deliveryFee)}</dd>
                  </div>
                  <div className="flex justify-between border-t border-sage/25 pt-3">
                    <dt className="font-serif text-lg font-semibold text-forest">Total</dt>
                    <dd className="font-serif text-2xl font-semibold text-forest">
                      {formatPrice(order.total)}
                    </dd>
                  </div>
                </dl>

                <p className="mt-7 rounded-2xl bg-beige px-5 py-4 text-center text-sm leading-relaxed text-forest/75">
                  Your order will be delivered within{' '}
                  <span className="font-semibold text-forest">{etaLabel}</span>.
                  {order?.customCakeNote && (
                    <span className="mt-1 block text-xs text-forest/60">
                      {order.customCakeNote}
                    </span>
                  )}
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Button as="link" to="/menu" variant="outline" className="flex-1">
                    Continue Shopping
                  </Button>
                  <Button as="link" to="/" className="flex-1">
                    Back to Home
                  </Button>
                </div>
              </div>
            ) : (
              <div className="px-6 py-12 sm:px-12">
                <p className="font-serif text-xl font-semibold text-forest">
                  We couldn&apos;t find your latest order.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <Button as="link" to="/menu" variant="outline" className="flex-1">
                    Continue Shopping
                  </Button>
                  <Button as="link" to="/" className="flex-1">
                    Back to Home
                  </Button>
                </div>
              </div>
            )}
          </div>

          <p className="mt-6 text-center text-xs text-forest/55">
            We appreciate your visit and thank you for choosing Hearth &amp; Bloom.
            {order?.customer?.email && (
              <>
                {' '}
                A confirmation has been sent to{' '}
                <span className="font-medium">{order.customer.email}</span>.
              </>
            )}
          </p>
        </div>
      </div>
    </section>
  )
}
