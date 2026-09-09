export default function VariantSelector({ variants, selectedLabel, onSelect }) {
  if (!variants || variants.length === 0) return null

  if (variants.length === 1) {
    return (
      <span className="inline-flex w-fit items-center rounded-full bg-sage/25 px-4 py-2 text-xs font-medium text-forest">
        {variants[0].label}
      </span>
    )
  }

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Select an option">
      {variants.map((variant) => {
        const isActive = variant.label === selectedLabel
        return (
          <button
            key={variant.label}
            type="button"
            onClick={() => onSelect(variant)}
            aria-pressed={isActive}
            className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-300 ${
              isActive
                ? 'border-forest bg-forest text-cream shadow-soft'
                : 'border-sage/40 bg-cream text-forest hover:border-forest/60 hover:bg-sage/15'
            }`}
          >
            {variant.label}
          </button>
        )
      })}
    </div>
  )
}
