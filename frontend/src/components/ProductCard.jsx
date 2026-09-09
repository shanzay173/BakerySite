import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/useCart.js'
import { formatPrice } from '../utils/pricing.js'
import ProductImage from './ProductImage.jsx'
import Stars from './Rating.jsx'
import VariantSelector from './VariantSelector.jsx'
import { CartIcon, CheckIcon } from './icons.jsx'

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const variants = product.variants?.length ? product.variants : null
  const [selectedVariant, setSelectedVariant] = useState(variants ? variants[0] : null)

  const activePrice = selectedVariant ? selectedVariant.price : product.price

  const handleAdd = (e) => {
    e.preventDefault()
    addItem({
      ...product,
      price: activePrice,
      variantLabel: selectedVariant?.label,
    })
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1600)
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-4xl border border-sage/20 bg-cream shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-glow">
      <Link
        to={`/product/${product.id}`}
        className="relative block aspect-square overflow-hidden"
        aria-label={`View details for ${product.name}`}
      >
        <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-110">
          <ProductImage product={product} />
        </div>
        {product.badge && (
          <span className="absolute left-4 top-4 rounded-full bg-forest px-3.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-widest text-cream shadow-soft">
            {product.badge}
          </span>
        )}
        <div
          className="absolute inset-0 bg-gradient-to-t from-forest/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          aria-hidden="true"
        />
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            {product.category && (
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-sage-dark">
                {product.category}
              </p>
            )}
            <h3 className="mt-1 font-serif text-xl font-semibold text-forest">
              <Link
                to={`/product/${product.id}`}
                className="transition-colors duration-300 hover:text-sage-dark"
              >
                {product.name}
              </Link>
            </h3>
          </div>
          <p className="whitespace-nowrap font-serif text-xl font-semibold text-forest">
            {formatPrice(activePrice)}
          </p>
        </div>

        {variants && (
          <div className="mt-4">
            <VariantSelector
              variants={variants}
              selectedLabel={selectedVariant?.label}
              onSelect={setSelectedVariant}
            />
          </div>
        )}

        {product.rating != null && (
          <div className="mt-2 flex items-center gap-2">
            <Stars rating={product.rating} className="h-3.5 w-3.5" />
            <span className="text-xs text-forest/55">
              {Number(product.rating).toFixed(1)}
              {product.reviews != null ? ` (${product.reviews})` : ''}
            </span>
          </div>
        )}
        {product.rating == null && product.reviews?.reviewRating != null && (
          <div className="mt-2 flex items-center gap-2">
            <Stars rating={product.reviews.reviewRating} className="h-3.5 w-3.5" />
            <span className="text-xs text-forest/55">
              {Number(product.reviews.reviewRating).toFixed(1)}
              {product.reviews.reviewCount != null ? ` (${product.reviews.reviewCount})` : ''}
            </span>
          </div>
        )}

        <p className="mt-2 flex-1 text-sm leading-relaxed text-forest/65">
          {product.description}
        </p>

        <div className="mt-5 flex gap-3">
          <Link
            to={`/product/${product.id}`}
            className="btn-outline flex-1 border-forest/20 px-4 hover:border-forest"
          >
            View Details
          </Link>
          <button
            type="button"
            onClick={handleAdd}
            aria-live="polite"
            className={`shrink-0 rounded-full px-5 py-3 transition-all duration-300 ${
              added
                ? 'btn-sage pointer-events-none'
                : 'bg-forest text-cream shadow-soft hover:-translate-y-0.5 hover:bg-forest-light hover:shadow-glow'
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            {added ? (
              <CheckIcon className="h-4 w-4" />
            ) : (
              <CartIcon className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
            )}
          </button>
        </div>
      </div>
    </article>
  )
}
