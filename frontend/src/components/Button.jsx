import { Link } from 'react-router-dom'

const VARIANTS = {
  primary: 'btn-primary',
  outline: 'btn-outline',
  sage: 'btn-sage',
  ghost: 'btn-ghost',
}

const SIZES = {
  md: '',
  lg: 'px-9 py-4 text-base',
  sm: 'px-5 py-2.5 text-xs',
}

export default function Button({
  as,
  to,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}) {
  const classes = `${VARIANTS[variant]} ${SIZES[size]} ${className}`

  if (as === 'link' && to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  )
}
