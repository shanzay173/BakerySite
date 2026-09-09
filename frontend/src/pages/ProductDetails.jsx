import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Button from '../components/Button.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import ProductImage from '../components/ProductImage.jsx'
import QuantitySelector from '../components/QuantitySelector.jsx'
import Reveal from '../components/Reveal.jsx'
import Stars from '../components/Rating.jsx'
import {
  ArrowRightIcon,
  CartIcon,
  CheckIcon,
  LeafIcon,
} from '../components/icons.jsx'
import { useCart } from '../context/useCart.js'
import { apiUrl } from '../utils/api.js'
import { formatPrice } from '../utils/pricing.js'

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()

  const [product, setProduct] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(null)
    setProduct(null)
    setRelated([])
    setQuantity(1)
    setAdded(false)

    fetch(apiUrl(`/api/products/${id}`))
      .then(async (res) => {
        if (!res.ok) throw new Error('not found')
        return res.json()
      })
      .then((data) => {
        setProduct(data)
        setLoading(false)
        return fetch(
          apiUrl(`/api/products?category=${encodeURIComponent(data.category)}&limit=4`),
        )
      })
      .then((r) => r.json())
      .then((data) => {
        setRelated(data.products.filter((p) => p.id !== id).slice(0, 3))
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [id])

  const handleAddToCart = () => {
    addItem(product, quantity)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1800)
  }

  const handleBuyNow = () => {
    addItem(product, quantity)
    navigate('/checkout')
  }

  if (loading) {
    return (
      <section className="bg-beige/50 pb-20 pt-28 lg:pt-36">
        <div className="container-px">
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="aspect-square animate-pulse rounded-4xl bg-sage/20" />
            <div className="space-y-5 lg:py-4">
              <div className="h-3 w-24 rounded bg-sage/20" />
              <div className="h-8 w-3/4 rounded bg-sage/20" />
              <div className="h-5 w-1/2 rounded bg-sage/20" />
              <div className="h-7 w-20 rounded bg-sage/20" />
              <div className="h-4 w-full rounded bg-sage/10" />
              <div className="h-4 w-2/3 rounded bg-sage/10" />
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error || !product) {
    return (
      <section className="bg-beige/50 pb-20 pt-28 lg:pt-36">
        <div className="container-px text-center">
          <p className="font-serif text-3xl font-semibold text-forest">Product not found</p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-forest/65">
            That treat seems to have been whisked away. Explore the rest of our menu instead.
          </p>
          <Button as="link" to="/menu" className="mt-8">
            Back to Menu
          </Button>
        </div>
      </section>
    )
  }

  const reviewRating = product.reviews?.reviewRating
  const reviewCount = product.reviews?.reviewCount

  return (
    <>
      <section className="bg-beige/50 pb-16 pt-28 lg:pt-36">
        <div className="container-px">
          <nav aria-label="Breadcrumb" className="text-sm text-forest/60">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link to="/" className="transition-colors hover:text-forest">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link to="/menu" className="transition-colors hover:text-forest">
                  Menu
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-medium text-forest">
                {product.name}
              </li>
            </ol>
          </nav>

          <div className="mt-10 grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
            <Reveal>
              <div className="relative overflow-hidden rounded-4xl border border-sage/20 bg-cream shadow-soft">
                <div className="aspect-square">
                  <ProductImage product={product} />
                </div>
                {product.discount > 0 && (
                  <span className="absolute left-5 top-5 rounded-full bg-forest px-4 py-2 text-xs font-semibold uppercase tracking-widest text-cream shadow-soft">
                    {product.discount}% off
                  </span>
                )}
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="lg:py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sage-dark">
                  {product.category}
                  {product.subcategory && ` · ${product.subcategory}`}
                </p>
                <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight text-forest sm:text-4xl lg:text-5xl">
                  {product.name}
                </h1>

                {reviewRating != null && (
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <Stars rating={reviewRating} />
                    <span className="text-sm font-medium text-forest">
                      {Number(reviewRating).toFixed(1)}
                    </span>
                    {reviewCount != null && (
                      <span className="text-sm text-forest/55">
                        · {reviewCount} reviews
                      </span>
                    )}
                    {product.availability && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-sage/25 px-3 py-1 text-xs font-medium text-forest">
                        <span className="h-1.5 w-1.5 rounded-full bg-sage-dark" aria-hidden="true" />
                        Available
                      </span>
                    )}
                  </div>
                )}

                <p className="mt-5 font-serif text-3xl font-semibold text-forest">
                  {formatPrice(product.price)}
                  {product.size && (
                    <span className="ml-2 text-sm font-normal text-forest/55">/ {product.size}</span>
                  )}
                </p>

                {product.discount > 0 && (
                  <p className="mt-1 text-xs font-medium text-sage-dark">
                    {product.discount}% off
                  </p>
                )}

                <p className="mt-5 leading-relaxed text-forest/70">
                  {product.description}
                </p>

                {product.ingredients && product.ingredients.length > 0 && (
                  <div className="mt-8">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-sage-dark">
                      Ingredients
                    </h2>
                    <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {product.ingredients.map((ingredient) => (
                        <li
                          key={ingredient}
                          className="flex items-center gap-2.5 text-sm text-forest/75"
                        >
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sage/30">
                            <LeafIcon className="h-3 w-3" />
                          </span>
                          {ingredient}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-8 flex flex-col gap-5 border-t border-sage/25 pt-7">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <p className="text-sm text-forest/65">Quantity</p>
                    <QuantitySelector size="lg" quantity={quantity} onChange={setQuantity} />
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      aria-live="polite"
                      className={`btn flex-1 ${
                        added
                          ? 'btn-sage pointer-events-none'
                          : 'btn-outline border-forest/25 hover:border-forest'
                      }`}
                    >
                      {added ? (
                        <>
                          Added to Cart
                          <CheckIcon className="h-4 w-4" />
                        </>
                      ) : (
                        <>
                          Add to Cart
                          <CartIcon className="h-4 w-4" />
                        </>
                      )}
                    </button>
                    <button type="button" onClick={handleBuyNow} className="btn-primary flex-1">
                      Buy Now
                      <ArrowRightIcon className="h-4 w-4" />
                    </button>
                  </div>

                  <p className="text-xs leading-relaxed text-forest/55">
                    {product.courierAllowed === false
                      ? 'Available for Lahore delivery only · Same Day (2–4 hours)'
                      : 'Delivery available across Pakistan · Baked fresh daily'}
                    {product.category === 'Cakes' &&
                      ' · Custom cakes require 1–2 days advance order'}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-16 lg:py-24">
          <div className="container-px">
            <Reveal className="mx-auto max-w-2xl text-center">
              <p className="eyebrow justify-center">
                <span className="h-px w-8 bg-sage" aria-hidden="true" />
                You may also love
                <span className="h-px w-8 bg-sage" aria-hidden="true" />
              </p>
              <h2 className="section-title mt-4">More from the {product.category} shelf</h2>
            </Reveal>
            <div className="mt-12">
              <ProductGrid products={related} cols="sm:grid-cols-2 lg:grid-cols-3" />
            </div>
          </div>
        </section>
      )}
    </>
  )
}
