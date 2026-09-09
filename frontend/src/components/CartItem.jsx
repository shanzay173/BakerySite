import { Link } from 'react-router-dom'
import ProductImage from './ProductImage.jsx'
import QuantitySelector from './QuantitySelector.jsx'
import { TrashIcon } from './icons.jsx'
import { formatPrice } from '../utils/pricing.js'
import { itemKey } from '../context/cartContext.js'

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <li className="flex flex-wrap items-center gap-5 rounded-3xl border border-sage/20 bg-cream p-5 shadow-card sm:flex-nowrap">
      <Link
        to={`/product/${item.id}`}
        className="block h-24 w-24 shrink-0 overflow-hidden rounded-2xl"
        aria-label={`View ${item.name}`}
      >
        <ProductImage product={item} className="h-full w-full" />
      </Link>

      <div className="min-w-0 flex-1">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-sage-dark">
          Hearth &amp; Bloom
        </p>
        <h3 className="mt-0.5 truncate font-serif text-lg font-semibold text-forest">
          <Link to={`/product/${item.id}`} className="transition-colors hover:text-sage-dark">
            {item.name}
            {item.variantLabel && (
              <span className="text-sm font-normal text-forest/55"> · {item.variantLabel}</span>
            )}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-forest/60">{formatPrice(item.price)} each</p>
      </div>

      <QuantitySelector quantity={item.quantity} onChange={(q) => onUpdateQuantity(itemKey(item), q)} />

      <div className="flex items-center gap-4 sm:w-24 sm:flex-col sm:items-end">
        <p className="font-serif text-lg font-semibold text-forest">
          {formatPrice(item.price * item.quantity)}
        </p>
        <button
          type="button"
          onClick={() => onRemove(itemKey(item))}
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-forest/60 transition-colors duration-300 hover:bg-red-50 hover:text-red-500"
        >
          <TrashIcon className="h-3.5 w-3.5" />
          Remove
        </button>
      </div>
    </li>
  )
}
