import { useState } from 'react'
import { ProductArt } from './BakeryArt.jsx'

export default function ProductImage({ product, className = 'h-full w-full', alt }) {
  const [error, setError] = useState(false)

  if (!product.image || error) {
    return <ProductArt illustration={product.illustration} className={className} />
  }

  return (
    <img
      src={product.image}
      alt={alt || product.name}
      loading="lazy"
      onError={() => setError(true)}
      className={`${className} object-cover`}
    />
  )
}
