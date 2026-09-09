export default function FormInput({
  label,
  id,
  error,
  textarea = false,
  className = '',
  ...rest
}) {
  const base =
    'w-full rounded-2xl border bg-cream px-5 py-3.5 text-sm text-forest placeholder:text-forest/40 outline-none transition-all duration-300 focus:ring-2'
  const border = error
    ? 'border-red-400/70 focus:border-red-500 focus:ring-red-300/40'
    : 'border-sage/30 focus:border-forest focus:ring-sage/40'

  const shared = {
    id,
    className: `${base} ${border} ${textarea ? 'resize-none' : ''} ${className}`,
    'aria-invalid': error ? 'true' : undefined,
    'aria-describedby': error ? `${id}-error` : undefined,
    ...rest,
  }

  return (
    <div>
      {label && (
        <label htmlFor={id} className="mb-2 block text-sm font-medium text-forest">
          {label}
          {rest.required && <span className="ml-0.5 text-sage-dark" aria-hidden="true">*</span>}
        </label>
      )}
      {textarea ? <textarea {...shared} /> : <input {...shared} />}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}
