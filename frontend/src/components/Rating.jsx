import { StarIcon } from './icons.jsx'

export function Stars({ rating, className = 'h-4 w-4' }) {
  const rounded = Math.round(rating)
  return (
    <div
      className="flex items-center gap-0.5 text-sage-dark"
      role="img"
      aria-label={`Rated ${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} className={`${className} ${i < rounded ? '' : 'opacity-30'}`} />
      ))}
    </div>
  )
}

export default Stars
