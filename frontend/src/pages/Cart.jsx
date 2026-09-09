import Button from '../components/Button.jsx'
import CartItem from '../components/CartItem.jsx'
import OrderSummary from '../components/OrderSummary.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import { ArrowRightIcon, CartIcon } from '../components/icons.jsx'
import { useCart } from '../context/useCart.js'
import { itemKey } from '../context/cartContext.js'
import { getDeliveryFee } from '../utils/pricing.js'

export default function Cart() {
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart()
  const delivery = getDeliveryFee(subtotal)
  const total = subtotal + delivery
  const hasLahoreOnly = items.some((item) => item.lahoreOnly === true)

  if (items.length === 0) {
    return (
      <>
        <PageHeader eyebrow="Your basket" title="Your Cart" />
        <section className="pb-20 lg:pb-28">
          <div className="container-px">
            <Reveal className="mx-auto max-w-xl text-center">
              <div className="rounded-4xl border border-sage/20 bg-cream p-14 shadow-card">
                <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-sage/25 text-forest">
                  <CartIcon className="h-9 w-9" />
                </span>
                <h2 className="mt-6 font-serif text-2xl font-semibold text-forest">
                  Your cart is empty
                </h2>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-forest/65">
                  It looks like you haven&apos;t added anything yet. Let&apos;s fill it with
                  something warm and wonderful.
                </p>
                <Button as="link" to="/menu" className="group mt-8">
                  Continue Shopping
                  <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </Reveal>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <PageHeader
        eyebrow="Your basket"
        title="Your Cart"
        subtitle={`${items.length} ${items.length === 1 ? 'item' : 'items'} waiting to be baked fresh for you.`}
      />

      <section className="pb-20 lg:pb-28">
        <div className="container-px grid items-start gap-10 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <ul className="space-y-5">
              {items.map((item) => (
                <CartItem
                  key={itemKey(item)}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Button as="link" to="/menu" variant="outline">
                <ArrowRightIcon className="h-4 w-4 rotate-180 transition-transform duration-300 group-hover:-translate-x-1" />
                Continue Shopping
              </Button>
              <button
                type="button"
                onClick={clearCart}
                className="self-start text-sm font-medium text-forest/55 underline-offset-4 transition-colors hover:text-red-500 hover:underline sm:self-auto"
              >
                Clear cart
              </button>
            </div>
          </Reveal>

          <Reveal delay={140} className="lg:sticky lg:top-24">
            <OrderSummary items={items} subtotal={subtotal} delivery={delivery} total={total}>
              <Button as="link" to="/checkout" className="group mt-7 w-full" size="lg">
                Proceed to Checkout
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <p className="mt-4 text-center text-xs leading-relaxed text-forest/55">
                Same Day Delivery in Lahore (2–4 hours) · Other cities in 2–4 working days
                {hasLahoreOnly && (
                  <span className="mt-1 block text-forest/70">
                    Some fresh items in your cart are Lahore-delivery only.
                  </span>
                )}
              </p>
            </OrderSummary>
          </Reveal>
        </div>
      </section>
    </>
  )
}
