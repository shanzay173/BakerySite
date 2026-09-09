import { useCallback, useEffect, useRef, useState } from 'react'
import CategoryFilter from '../components/CategoryFilter.jsx'
import PageHeader from '../components/PageHeader.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import Reveal from '../components/Reveal.jsx'
import { SearchIcon } from '../components/icons.jsx'
import Button from '../components/Button.jsx'
import { apiUrl } from '../utils/api.js'

export default function Menu() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState(null)
  const abortRef = useRef(null)

  useEffect(() => {
    fetch(apiUrl('/api/products/categories'))
      .then((r) => r.json())
      .then(setCategories)
      .catch(() => {})
  }, [])

  const fetchProducts = useCallback(
    async (pageNum, append = false) => {
      if (abortRef.current) abortRef.current.abort()
      const controller = new AbortController()
      abortRef.current = controller

      if (append) {
        setLoadingMore(true)
      } else {
        setLoading(true)
      }
      setError(null)

      try {
        const params = new URLSearchParams({ page: String(pageNum), limit: '18' })
        if (category !== 'All') params.set('category', category)
        if (query.trim()) params.set('search', query.trim())

        const res = await fetch(apiUrl(`/api/products?${params}`), { signal: controller.signal })
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()

        setProducts((prev) => (append ? [...prev, ...data.products] : data.products))
        setTotal(data.total)
        setTotalPages(data.totalPages)
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message)
      } finally {
        setLoading(false)
        setLoadingMore(false)
      }
    },
    [category, query],
  )

  useEffect(() => {
    setPage(1)
    fetchProducts(1, false)
  }, [fetchProducts])

  const handleSearch = (e) => setQuery(e.target.value)
  const handleCategory = (cat) => setCategory(cat)
  const handleLoadMore = () => {
    const next = page + 1
    setPage(next)
    fetchProducts(next, true)
  }

  const showEmpty = !loading && !error && products.length === 0

  return (
    <>
      <PageHeader
        eyebrow="Fresh from the oven"
        title="Our Menu"
        subtitle="Everything is baked by hand in small batches each morning — choose your favourites and we'll have them ready for you."
      />

      <section className="pb-20 lg:pb-28">
        <div className="container-px">
          <Reveal className="mx-auto max-w-2xl">
            <div className="relative">
              <label htmlFor="menu-search" className="sr-only">
                Search the menu
              </label>
              <SearchIcon className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-sage-dark" />
              <input
                id="menu-search"
                type="search"
                value={query}
                onChange={handleSearch}
                placeholder="Search our menu..."
                className="w-full rounded-full border border-sage/40 bg-cream py-4 pl-14 pr-6 text-sm text-forest shadow-card outline-none transition-all duration-300 placeholder:text-forest/40 focus:border-forest focus:ring-2 focus:ring-sage/40"
              />
            </div>
          </Reveal>

          <Reveal className="mt-8" delay={120}>
            <CategoryFilter categories={categories} active={category} onChange={handleCategory} />
          </Reveal>

          {!loading && !error && (
            <Reveal className="mt-10 flex items-center justify-between gap-4" delay={160}>
              <p className="text-sm text-forest/60" role="status">
                <span className="font-semibold text-forest">{total}</span> Delicious Products
                {category !== 'All' && (
                  <>
                    {' '}in <span className="font-semibold text-forest">{category}</span>
                  </>
                )}
              </p>
            </Reveal>
          )}

          {loading && (
            <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
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
            <div className="mt-10 rounded-4xl border border-sage/20 bg-cream p-14 text-center shadow-card">
              <p className="font-serif text-2xl font-semibold text-forest">
                We&apos;re having trouble loading our menu.
              </p>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-forest/65">
                Something went wrong while fetching our products. Please try again.
              </p>
              <div className="mt-7">
                <Button variant="primary" onClick={() => fetchProducts(1, false)}>
                  Try Again
                </Button>
              </div>
            </div>
          )}

          {showEmpty && (
            <div className="mt-10 rounded-4xl border border-sage/20 bg-cream p-14 text-center shadow-card">
              <p className="font-serif text-2xl font-semibold text-forest">
                No bakery items found.
              </p>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-forest/65">
                We couldn&apos;t find anything matching your search. Try a different word or browse
                the full menu.
              </p>
              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button variant="outline" onClick={() => setQuery('')}>
                  Clear search
                </Button>
                <Button variant="primary" onClick={() => setCategory('All')}>
                  View All Products
                </Button>
              </div>
            </div>
          )}

          {!loading && !error && products.length > 0 && (
            <div className="mt-8">
              <ProductGrid products={products} cols="sm:grid-cols-2 lg:grid-cols-3" />
            </div>
          )}

          {!loading && !error && page < totalPages && (
            <Reveal className="mt-12 text-center" delay={200}>
              <Button variant="outline" onClick={handleLoadMore} disabled={loadingMore}>
                {loadingMore ? 'Loading...' : 'Load More'}
              </Button>
            </Reveal>
          )}
        </div>
      </section>
    </>
  )
}
