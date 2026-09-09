import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from './Button.jsx'
import ProductCard from './ProductCard.jsx'
import Reveal from './Reveal.jsx'
import { ArrowRightIcon } from './icons.jsx'
import { apiUrl } from '../utils/api.js'

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchBestsellers = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(apiUrl('/api/products?featured=true&limit=6'))
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setProducts(data.products)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchBestsellers()
  }, [fetchBestsellers])

  return (
    <section id="menu" className="bg-beige/50 py-20 lg:py-28">
      <div className="container-px">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">
            <span className="h-px w-8 bg-sage" aria-hidden="true" />
            Our Bestsellers
            <span className="h-px w-8 bg-sage" aria-hidden="true" />
          </p>
          <h2 className="section-title mt-4">Fresh from the oven</h2>
          <p className="section-subtitle">
            A little taste of what we bake each morning — crafted in small
            batches, gone by the afternoon.
          </p>
        </Reveal>

        {loading && (
          <div className="mt-14 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-4xl border border-sage/20 bg-cream shadow-card">
                <div className="aspect-square animate-pulse bg-sage/20" />
                <div className="p-6 space-y-3">
                  <div className="h-3 w-16 rounded bg-sage/20" />
                  <div className="h-5 w-3/4 rounded bg-sage/20" />
                  <div className="h-4 w-1/2 rounded bg-sage/20" />
                  <div className="h-3 w-full rounded bg-sage/10" />
                  <div className="h-3 w-2/3 rounded bg-sage/10" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="mt-14 rounded-4xl border border-sage/20 bg-cream p-14 text-center shadow-card">
            <p className="font-serif text-2xl font-semibold text-forest">
              We&apos;re having trouble loading our bestsellers.
            </p>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-forest/65">
              Something went wrong while fetching our products. Please try again.
            </p>
            <div className="mt-7">
              <Button variant="primary" onClick={fetchBestsellers}>
                Try Again
              </Button>
            </div>
          </div>
        )}

        {!loading && !error && (
          <div className="mt-14 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {products.map((product, index) => (
              <Reveal key={product.id} delay={(index % 3) * 110}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <p className="mt-14 text-center text-sm text-forest/60" role="status">
            Our bestsellers are being restocked — check back soon.
          </p>
        )}

        <Reveal className="mt-14 text-center" delay={200}>
          <Link to="/menu" className="btn-primary group">
            See the Full Menu
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
