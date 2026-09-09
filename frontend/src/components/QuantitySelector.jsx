import { MinusIcon, PlusIcon } from './icons.jsx'

export default function QuantitySelector({ quantity, onChange, size = 'md' }) {
  const clamp = (value) => Math.max(1, Math.min(99, value))

  const sizing = size === 'lg' ? 'h-12 w-12 text-base' : 'h-10 w-10 text-sm'

  return (
    <div className="inline-flex items-center rounded-full border border-sage/40 bg-cream p-1.5">
      <button
        type="button"
        onClick={() => onChange(clamp(quantity - 1))}
        aria-label="Decrease quantity"
        className={`flex ${sizing} items-center justify-center rounded-full text-forest transition-colors duration-300 hover:bg-sage/30 disabled:opacity-40`}
        disabled={quantity <= 1}
      >
        <MinusIcon className="h-4 w-4" />
      </button>
      <output
        aria-live="polite"
        className={`min-w-10 text-center font-medium text-forest ${size === 'lg' ? 'text-base' : 'text-sm'}`}
      >
        {quantity}
      </output>
      <button
        type="button"
        onClick={() => onChange(clamp(quantity + 1))}
        aria-label="Increase quantity"
        className={`flex ${sizing} items-center justify-center rounded-full text-forest transition-colors duration-300 hover:bg-sage/30 disabled:opacity-40`}
        disabled={quantity >= 99}
      >
        <PlusIcon className="h-4 w-4" />
      </button>
    </div>
  )
}
