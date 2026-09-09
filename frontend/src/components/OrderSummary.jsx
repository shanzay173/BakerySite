import { formatPrice } from '../utils/pricing.js'
import { itemKey } from '../context/cartContext.js'

export default function OrderSummary({
  items,
  subtotal,
  delivery,
  total,
  children,
  showItems = false,
  className = '',
}) {

  return (
    <div
      className={`rounded-4xl border border-sage/20 bg-cream p-7 shadow-card sm:p-8 ${className}`}
    >
      <h2 className="font-serif text-xl font-semibold text-forest">Order Summary</h2>

      {showItems && (
        <ul className="mt-5 max-h-72 space-y-4 overflow-y-auto pr-1">
          {items.map((item) => (
            <li key={itemKey(item)} className="flex items-center gap-3">
              <span className="text-xs text-forest/60">×{item.quantity}</span>
              <span className="flex-1 truncate text-sm text-forest/80">
                {item.name}
                {item.variantLabel && ` · ${item.variantLabel}`}
              </span>
              <span className="text-sm font-medium text-forest">
                {formatPrice(item.price * item.quantity)}
              </span>
            </li>
          ))}
        </ul>
      )}

      <dl className={`${showItems ? 'mt-5 border-t border-sage/25 pt-5' : 'mt-5'} space-y-3 text-sm`}>
        <div className="flex items-center justify-between text-forest/75">
          <dt>Subtotal</dt>
          <dd className="font-medium text-forest">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex items-center justify-between text-forest/75">
          <dt>Delivery fee</dt>
          <dd className="font-medium text-forest">{formatPrice(delivery)}</dd>
        </div>
        <div className="flex items-center justify-between border-t border-sage/25 pt-4">
          <dt className="font-serif text-lg font-semibold text-forest">Total</dt>
          <dd className="font-serif text-2xl font-semibold text-forest">{formatPrice(total)}</dd>
        </div>
      </dl>

      {children}
    </div>
  )
}
