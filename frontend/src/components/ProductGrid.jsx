import ProductCard from './ProductCard.jsx'
import Reveal from './Reveal.jsx'

export default function ProductGrid({ products, cols = 'sm:grid-cols-2 lg:grid-cols-3' }) {
  return (
    <div className={`grid grid-cols-1 gap-7 ${cols} lg:gap-8`}>
      {products.map((product, index) => (
        <Reveal key={product.id} delay={(index % 3) * 100}>
          <ProductCard product={product} />
        </Reveal>
      ))}
    </div>
  )
}
