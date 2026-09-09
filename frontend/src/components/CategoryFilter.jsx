const ALL = 'All'

export default function CategoryFilter({ categories, active, onChange }) {
  const options = [ALL, ...categories]

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {options.map((category) => {
        const isActive = active === category
        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            aria-pressed={isActive}
            className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest ${
              isActive
                ? 'border-forest bg-forest text-cream shadow-soft'
                : 'border-sage/40 bg-cream text-forest/75 hover:border-forest hover:text-forest'
            }`}
          >
            {category}
          </button>
        )
      })}
    </div>
  )
}
