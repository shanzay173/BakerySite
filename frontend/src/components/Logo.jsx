import { Link } from 'react-router-dom'
import { WheatIcon } from './icons.jsx'

export default function Logo({ variant = 'light', className = '' }) {
  const isDark = variant === 'dark'
  const markBg = isDark ? 'bg-sage' : 'bg-forest'
  const markText = isDark ? 'text-forest' : 'text-cream'
  const title = isDark ? 'text-forest' : 'text-cream'
  const subtitle = isDark ? 'text-forest/60' : 'text-cream/70'

  return (
    <Link
      to="/"
      className={`group inline-flex items-center gap-3 ${className}`}
      aria-label="Hearth and Bloom — home"
    >
      <span
        className={`inline-flex h-11 w-11 items-center justify-center rounded-full ${markBg} ${markText} transition-transform duration-300 group-hover:rotate-6`}
      >
        <WheatIcon className="h-6 w-6" strokeWidth={1.8} />
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-serif text-xl font-semibold tracking-tight ${title}`}>
          Hearth &amp; Bloom
        </span>
        <span className={`mt-1 text-[0.65rem] font-medium uppercase tracking-[0.3em] ${subtitle}`}>
          Artisan Bakery
        </span>
      </span>
    </Link>
  )
}
