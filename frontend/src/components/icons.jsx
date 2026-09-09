/* eslint-disable react/no-unknown-property */
export function WheatIcon({ className = 'h-5 w-5', strokeWidth = 2 }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 22V8" />
      <path d="M12 10c-2.5 0-4.5-1.5-4.5-4 2.5 0 4.5 1.5 4.5 4z" />
      <path d="M12 10c2.5 0 4.5-1.5 4.5-4-2.5 0-4.5 1.5-4.5 4z" />
      <path d="M12 14.5c-2.5 0-4.5-1.5-4.5-4 2.5 0 4.5 1.5 4.5 4z" />
      <path d="M12 14.5c2.5 0 4.5-1.5 4.5-4-2.5 0-4.5 1.5-4.5 4z" />
      <path d="M12 19c-2.5 0-4.5-1.5-4.5-4 2.5 0 4.5 1.5 4.5 4z" />
      <path d="M12 19c2.5 0 4.5-1.5 4.5-4-2.5 0-4.5 1.5-4.5 4z" />
    </svg>
  )
}

export function StarIcon({ className = 'h-4 w-4', half = false }) {
  if (half) {
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="star-half">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path
          d="M12 2.5l2.9 5.9 6.5.95-4.7 4.6 1.1 6.5L12 17.4l-5.8 3.05 1.1-6.5-4.7-4.6 6.5-.95L12 2.5z"
          fill="url(#star-half)"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.6 1.1 6.5L12 17.4l-5.8 3.05 1.1-6.5-4.7-4.6 6.5-.95L12 2.5z" />
    </svg>
  )
}

export function CartIcon({ className = 'h-4 w-4' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="9" cy="21" r="1.5" />
      <circle cx="19" cy="21" r="1.5" />
      <path d="M2.5 3h2.2l2.6 12.4a1.8 1.8 0 001.8 1.5h8.9a1.8 1.8 0 001.7-1.3L21.6 8H6" />
    </svg>
  )
}

export function ArrowRightIcon({ className = 'h-4 w-4' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 12h16" />
      <path d="M13 5l7 7-7 7" />
    </svg>
  )
}

export function LeafIcon({ className = 'h-6 w-6' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 20c0-9 5-15 15-15 0 10-6 15-15 15z" />
      <path d="M5 20c4-5 8-9 12-12" />
    </svg>
  )
}

export function HandIcon({ className = 'h-6 w-6' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 11V5a1.5 1.5 0 00-3 0v5" />
      <path d="M14 10V4a1.5 1.5 0 00-3 0v6" />
      <path d="M10 10V6a1.5 1.5 0 00-3 0v7" />
      <path d="M7 15c-1-1-1.8-2.6-1.8-4.3a1.6 1.6 0 013.2 0V12" />
      <path d="M7 12.5V8a1.5 1.5 0 00-3 0v6.5c0 4 3 5.5 6 5.5 3 0 5-1.2 6.6-3.3L18.6 14a1.7 1.7 0 00-2.9-1.8L14 14" />
    </svg>
  )
}

export function RecipeIcon({ className = 'h-6 w-6' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 20V7a2 2 0 012-2h12a2 2 0 012 2v13" />
      <path d="M4 20h16" />
      <path d="M9 8h6" />
      <path d="M9 12h6" />
      <path d="M9 16h4" />
    </svg>
  )
}

export function SmileIcon({ className = 'h-6 w-6' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 14.5a4.5 4.5 0 007 0" />
      <path d="M9 9.5h.01" />
      <path d="M15 9.5h.01" />
    </svg>
  )
}

export function PhoneIcon({ className = 'h-5 w-5' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 2 .7 2.9a2 2 0 01-.5 2.1L8 10a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.5c.9.3 1.9.6 2.9.7a2 2 0 011.7 2z" />
    </svg>
  )
}

export function MailIcon({ className = 'h-5 w-5' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
      <path d="M3 6l9 6 9-6" />
    </svg>
  )
}

export function MapPinIcon({ className = 'h-5 w-5' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1116 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

export function ClockIcon({ className = 'h-5 w-5' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  )
}

export function MenuIcon({ className = 'h-6 w-6' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M3.5 6h17" />
      <path d="M3.5 12h17" />
      <path d="M3.5 18h17" />
    </svg>
  )
}

export function CloseIcon({ className = 'h-6 w-6' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M5 5l14 14" />
      <path d="M19 5L5 19" />
    </svg>
  )
}

export function CheckIcon({ className = 'h-4 w-4' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 12.5l5 5L20 6.5" />
    </svg>
  )
}

export function SearchIcon({ className = 'h-5 w-5' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  )
}

export function PlusIcon({ className = 'h-4 w-4' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  )
}

export function MinusIcon({ className = 'h-4 w-4' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
    </svg>
  )
}

export function TrashIcon({ className = 'h-4 w-4' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3.5 6h17" />
      <path d="M8 6V4.5A1.5 1.5 0 019.5 3h5A1.5 1.5 0 0116 4.5V6" />
      <path d="M6 6l1 14a1.5 1.5 0 001.5 1.4h7A1.5 1.5 0 0017 20l1-14" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </svg>
  )
}

export function SocialIcon({ name, className = 'h-5 w-5' }) {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className,
    viewBox: '0 0 24 24',
    'aria-hidden': 'true',
  }
  switch (name) {
    case 'instagram':
      return (
        <svg {...common}>
          <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
          <circle cx="12" cy="12" r="4.2" />
          <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'facebook':
      return (
        <svg {...common}>
          <path d="M15 3h-2.5A3.5 3.5 0 009 6.5V9H6.5v3H9v9h3v-9h2.5l.5-3H12V6.6a.6.6 0 01.6-.6H15V3z" />
        </svg>
      )
    case 'pinterest':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M10 20c.5-2 .8-3.5 1.4-5" />
          <path d="M11.5 12.5c.7-1.6 3-1.7 3.3.2.2 1.4-.7 3-2.3 3-1.2 0-2-.8-1.7-1.8.3-1 1.4-2 1.2-3-.2-.9-1.2-1.4-2-.9-1.2.7-1.8 2-1.6 3.4" />
        </svg>
      )
    case 'tiktok':
      return (
        <svg {...common}>
          <path d="M9 12a4 4 0 100 8 4 4 0 001.2-6.5" />
          <path d="M14.5 4a4.5 4.5 0 004.5 4.5v3a7.5 7.5 0 01-4.5-1.5V16a5.5 5.5 0 11-5.5-5.5c.3 0 .6 0 .9.1" />
        </svg>
      )
    default:
      return null
  }
}
