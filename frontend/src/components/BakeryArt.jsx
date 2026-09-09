/* eslint-disable react/no-unknown-property */

const BROWN = {
  dark: '#A56B3C',
  mid: '#C08A52',
  light: '#DCA96F',
  crust: '#E8C389',
  golden: '#F0D9AC',
  inner: '#F6E7C8',
}

function SoftBackground({ className = 'h-full w-full' }) {
  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden="true">
      <rect width="200" height="200" fill="#EFE5D5" />
      <circle cx="100" cy="100" r="86" fill="none" stroke="#A8B5A0" strokeOpacity="0.35" strokeWidth="1.4" />
      <circle cx="100" cy="100" r="66" fill="none" stroke="#A8B5A0" strokeOpacity="0.2" strokeWidth="1.2" />
    </svg>
  )
}

export function CroissantArt({ className = 'h-full w-full' }) {
  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden="true">
      <SoftBackground />
      <g transform="translate(6 6) rotate(4 100 100)">
        <path
          d="M46 152 C40 92 92 52 156 74 C128 92 122 118 150 146 C116 162 72 164 46 152 Z"
          fill={BROWN.mid}
        />
        <path
          d="M54 144 C50 98 92 64 146 82 C124 96 118 118 140 140"
          fill={BROWN.light}
          stroke={BROWN.light}
          strokeWidth="2"
        />
        <path
          d="M62 140 C60 104 94 78 136 90 C118 102 112 120 132 138"
          fill={BROWN.crust}
          stroke={BROWN.crust}
          strokeWidth="2"
        />
        <path
          d="M70 134 C70 110 96 92 126 98 C112 108 106 122 124 136"
          fill={BROWN.golden}
          stroke={BROWN.golden}
          strokeWidth="2"
        />
        <path d="M60 148 L148 84" stroke={BROWN.dark} strokeWidth="2.4" strokeLinecap="round" opacity="0.55" />
        <path d="M74 152 L152 96" stroke={BROWN.dark} strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      </g>
    </svg>
  )
}

export function SourdoughArt({ className = 'h-full w-full' }) {
  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden="true">
      <SoftBackground />
      <ellipse cx="100" cy="122" rx="60" ry="40" fill={BROWN.mid} />
      <ellipse cx="100" cy="118" rx="56" ry="34" fill={BROWN.crust} />
      <ellipse cx="88" cy="110" rx="30" ry="16" fill={BROWN.golden} opacity="0.9" />
      <path
        d="M100 100 L110 88 M100 100 L124 92 M100 100 L126 112 M100 100 L114 124 M100 100 L92 126 M100 100 L76 120 M100 100 L72 106 M100 100 L84 92"
        stroke={BROWN.light}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M100 100 L110 88 M100 100 L124 92 M100 100 L126 112 M100 100 L114 124 M100 100 L92 126 M100 100 L76 120 M100 100 L72 106 M100 100 L84 92"
        stroke={BROWN.dark}
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.7"
      />
      <ellipse cx="90" cy="106" rx="14" ry="6" fill="#FFFDF7" opacity="0.5" />
    </svg>
  )
}

export function CinnamonArt({ className = 'h-full w-full' }) {
  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden="true">
      <SoftBackground />
      <ellipse cx="100" cy="128" rx="58" ry="34" fill={BROWN.dark} />
      <ellipse cx="100" cy="120" rx="54" ry="30" fill={BROWN.mid} />
      <circle cx="100" cy="116" r="42" fill={BROWN.crust} />
      <path
        d="M100 74 a42 42 0 0 1 0 84 M100 78 a38 38 0 0 0 0 76 M100 84 a32 32 0 0 1 0 64 M100 90 a26 26 0 0 0 0 52 M100 96 a20 20 0 0 1 0 40 M100 102 a14 14 0 0 0 0 28"
        fill="none"
        stroke={BROWN.dark}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M64 96 c-14 8 -16 20 -8 26 c-4 12 6 22 18 24 c-8 8 -22 4 -28 -8 c-10 -8 -4 -24 12 -30 c4 -2 8 -4 12 -8 Z"
        fill="#FFFDF7"
        opacity="0.9"
      />
      <path
        d="M132 102 c12 2 18 12 14 22 c10 4 12 16 6 22 c-12 8 -28 0 -26 -12 c-6 -8 -2 -20 6 -24 c0 -4 0 -8 0 -8 Z"
        fill="#FFFDF7"
        opacity="0.9"
      />
      <path
        d="M92 66 c8 -8 20 -8 22 0 c-8 6 -16 6 -22 0 Z"
        fill="#FFFDF7"
        opacity="0.9"
      />
    </svg>
  )
}

export function BaguetteArt({ className = 'h-full w-full' }) {
  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden="true">
      <SoftBackground />
      <g transform="rotate(-24 100 100)">
        <rect x="46" y="92" width="108" height="26" rx="13" fill={BROWN.mid} />
        <rect x="46" y="94" width="108" height="16" rx="8" fill={BROWN.crust} />
        <path
          d="M60 96 l6 -6 M80 94 l6 -6 M100 94 l6 -6 M120 94 l6 -6 M140 96 l6 -6"
          stroke={BROWN.dark}
          strokeWidth="2.4"
          strokeLinecap="round"
          opacity="0.75"
        />
        <path d="M46 104 l108 0" stroke={BROWN.dark} strokeWidth="1.6" strokeLinecap="round" opacity="0.5" />
      </g>
      <path d="M40 42 h10" stroke="#A8B5A0" strokeWidth="3" strokeLinecap="round" />
      <path d="M46 30 v10" stroke="#A8B5A0" strokeWidth="3" strokeLinecap="round" />
      <path d="M152 150 h12" stroke="#A8B5A0" strokeWidth="3" strokeLinecap="round" />
      <path d="M158 142 v10" stroke="#A8B5A0" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

export function MuffinArt({ className = 'h-full w-full' }) {
  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden="true">
      <SoftBackground />
      <path
        d="M74 132 h52 l-6 34 h-40 Z"
        fill="#A8B5A0"
      />
      <path
        d="M70 134 h60 l6 -8 c-2 -14 -14 -18 -24 -22 c-6 -8 -18 -8 -24 0 c-10 4 -22 8 -24 22 Z"
        fill={BROWN.mid}
      />
      <ellipse cx="100" cy="116" rx="34" ry="16" fill={BROWN.crust} />
      <circle cx="86" cy="112" r="6" fill="#4A5B88" />
      <circle cx="100" cy="106" r="6.5" fill="#4A5B88" />
      <circle cx="114" cy="114" r="5.5" fill="#4A5B88" />
      <circle cx="94" cy="118" r="5" fill="#5A6F9E" />
      <path
        d="M78 96 c4 -6 14 -6 16 0 c-6 5 -12 5 -16 0 Z"
        fill="#FFFDF7"
        opacity="0.95"
      />
      <path
        d="M106 100 c3 -5 12 -5 14 0 c-5 4 -11 4 -14 0 Z"
        fill="#FFFDF7"
        opacity="0.95"
      />
    </svg>
  )
}

export function MacaronArt({ className = 'h-full w-full' }) {
  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden="true">
      <SoftBackground />
      <g>
        <rect x="52" y="108" width="96" height="26" rx="13" fill="#CFD8C7" />
        <rect x="52" y="106" width="96" height="10" rx="5" fill="#E8EDE2" />
        <rect x="56" y="112" width="88" height="8" rx="4" fill="#C0CCB8" opacity="0.8" />
        <rect x="60" y="126" width="80" height="8" rx="4" fill="#4A5B3B" opacity="0.25" />
        <rect x="52" y="130" width="96" height="4" rx="2" fill="#B8C4AE" />
        <rect x="52" y="70" width="96" height="26" rx="13" fill="#CFD8C7" />
        <rect x="52" y="68" width="96" height="10" rx="5" fill="#E8EDE2" />
        <rect x="60" y="84" width="80" height="8" rx="4" fill="#8A9B7F" opacity="0.5" />
        <rect x="52" y="92" width="96" height="4" rx="2" fill="#B8C4AE" />
        <rect x="58" y="96" width="84" height="12" rx="6" fill="#A8B5A0" />
        <path d="M60 72 l4 -5 M72 70 l4 -5 M84 70 l4 -5 M96 70 l4 -5 M108 70 l4 -5 M120 70 l4 -5 M132 72 l4 -5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      </g>
    </svg>
  )
}

export function CakeArt({ className = 'h-full w-full' }) {
  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden="true">
      <SoftBackground />
      <rect x="52" y="112" width="96" height="40" rx="8" fill={BROWN.mid} />
      <rect x="56" y="118" width="88" height="26" rx="4" fill={BROWN.crust} />
      <ellipse cx="100" cy="116" rx="50" ry="12" fill="#7A4B28" />
      <path
        d="M56 116 h88 M64 122 h72 M72 128 h56"
        stroke={BROWN.dark}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path d="M56 118 q8 -6 16 0 q8 -6 16 0 q8 -6 16 0 q8 -6 16 0 q8 -6 16 0" fill="none" stroke="#FFFDF7" strokeWidth="5" strokeLinecap="round" />
      <circle cx="74" cy="104" r="5" fill="#A8B5A0" />
      <circle cx="100" cy="98" r="6" fill="#8B9A82" />
      <circle cx="126" cy="104" r="5" fill="#A8B5A0" />
      <rect x="52" y="152" width="96" height="10" rx="5" fill={BROWN.dark} />
    </svg>
  )
}

export function CupcakeArt({ className = 'h-full w-full' }) {
  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden="true">
      <SoftBackground />
      <path d="M70 128 h60 l-5 36 h-50 Z" fill="#A8B5A0" />
      <path
        d="M64 130 h72 l8 -10 c-2 -16 -16 -22 -28 -26 c-6 -10 -22 -10 -28 0 c-12 4 -26 10 -28 26 Z"
        fill={BROWN.mid}
      />
      <ellipse cx="100" cy="112" rx="40" ry="18" fill={BROWN.crust} />
      <path
        d="M84 100 c4 -7 14 -7 16 0 c-7 5 -12 5 -16 0 Z"
        fill="#FFFDF7"
        opacity="0.95"
      />
      <path
        d="M100 96 c3 -5 11 -5 13 0 c-5 4 -10 4 -13 0 Z"
        fill="#FFFDF7"
        opacity="0.95"
      />
      <path
        d="M78 106 c2 -4 9 -4 11 0 c-4 3 -9 3 -11 0 Z"
        fill="#FFFDF7"
        opacity="0.95"
      />
      <path d="M70 132 c2 -3 5 -3 7 0 c-2 3 -5 3 -7 0 Z" fill="#8B9A82" />
      <path d="M86 128 c2 -3 5 -3 7 0 c-2 3 -5 3 -7 0 Z" fill="#8B9A82" />
      <path d="M110 126 c2 -3 5 -3 7 0 c-2 3 -5 3 -7 0 Z" fill="#8B9A82" />
      <path d="M124 132 c2 -3 5 -3 7 0 c-2 3 -5 3 -7 0 Z" fill="#8B9A82" />
    </svg>
  )
}

export function CookieArt({ className = 'h-full w-full' }) {
  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden="true">
      <SoftBackground />
      <circle cx="100" cy="104" r="62" fill={BROWN.crust} />
      <circle cx="100" cy="102" r="58" fill={BROWN.golden} />
      <circle cx="100" cy="100" r="52" fill={BROWN.inner} />
      <circle cx="78" cy="84" r="8" fill="#5A4632" />
      <circle cx="118" cy="80" r="7" fill="#5A4632" />
      <circle cx="96" cy="112" r="8" fill="#5A4632" />
      <circle cx="126" cy="108" r="7" fill="#5A4632" />
      <circle cx="78" cy="118" r="6" fill="#5A4632" />
      <path d="M82 76 c6 -8 12 -4 10 2 c-4 5 -10 3 -10 -2 Z" fill="#FFFDF7" opacity="0.8" />
      <path d="M118 96 c4 -6 10 -4 8 2 c-4 4 -10 2 -8 -2 Z" fill="#FFFDF7" opacity="0.8" />
      <circle cx="100" cy="88" r="14" fill="none" stroke={BROWN.dark} strokeWidth="2" opacity="0.3" />
    </svg>
  )
}

export function DonutArt({ className = 'h-full w-full' }) {
  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden="true">
      <SoftBackground />
      <circle cx="100" cy="104" r="58" fill={BROWN.crust} />
      <circle cx="100" cy="102" r="52" fill="#8B5A2B" />
      <circle cx="100" cy="100" r="46" fill={BROWN.golden} />
      <path
        d="M60 92 a42 42 0 0 1 80 0"
        fill="none"
        stroke="#5A4632"
        strokeWidth="10"
        strokeLinecap="round"
        opacity="0.85"
      />
      <circle cx="100" cy="104" r="22" fill="#EFE5D5" />
      <circle cx="100" cy="104" r="18" fill="#F6E7C8" />
      <circle cx="100" cy="104" r="13" fill={BROWN.dark} />
      <path d="M76 82 l8 -5 M120 82 l-8 -5" stroke="#FFFDF7" strokeWidth="4" strokeLinecap="round" opacity="0.7" />
      <circle cx="90" cy="78" r="3" fill="#FFFDF7" opacity="0.9" />
      <circle cx="112" cy="80" r="3" fill="#FFFDF7" opacity="0.9" />
    </svg>
  )
}

export function TartArt({ className = 'h-full w-full' }) {
  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden="true">
      <SoftBackground />
      <path d="M52 108 h96 l-8 38 h-80 Z" fill={BROWN.crust} />
      <path d="M52 108 h96 l-8 38 h-80 Z" fill="none" stroke={BROWN.dark} strokeWidth="2" opacity="0.4" />
      <ellipse cx="100" cy="108" rx="50" ry="18" fill={BROWN.light} />
      <ellipse cx="100" cy="104" rx="46" ry="15" fill={BROWN.golden} />
      <ellipse cx="100" cy="104" rx="44" ry="13" fill="#FFFDF7" />
      <circle cx="78" cy="100" r="9" fill="#C0504A" />
      <circle cx="100" cy="94" r="9" fill="#7A4B8A" />
      <circle cx="122" cy="100" r="9" fill="#C0504A" />
      <circle cx="90" cy="112" r="8" fill="#4A5B88" />
      <circle cx="112" cy="112" r="8" fill="#E8A33D" />
      <path d="M64 102 c4 4 8 6 12 5" stroke="#A8B5A0" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M124 108 c2 3 6 4 10 2" stroke="#A8B5A0" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  )
}

export function EclairArt({ className = 'h-full w-full' }) {
  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden="true">
      <SoftBackground />
      <g transform="rotate(-16 100 104)">
        <rect x="34" y="88" width="132" height="34" rx="17" fill={BROWN.mid} />
        <rect x="34" y="92" width="132" height="20" rx="10" fill={BROWN.crust} />
        <rect x="42" y="86" width="116" height="10" rx="5" fill="#4A3222" />
        <path
          d="M58 90 l4 -5 M78 90 l4 -5 M98 90 l4 -5 M118 90 l4 -5 M138 90 l4 -5"
          stroke="#FFFDF7"
          strokeWidth="2.6"
          strokeLinecap="round"
          opacity="0.5"
        />
        <path d="M40 108 h120" stroke={BROWN.dark} strokeWidth="1.6" strokeLinecap="round" opacity="0.45" />
      </g>
    </svg>
  )
}

export function BreadArt({ className = 'h-full w-full' }) {
  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden="true">
      <SoftBackground />
      <ellipse cx="100" cy="128" rx="62" ry="38" fill={BROWN.mid} />
      <ellipse cx="100" cy="122" rx="56" ry="32" fill={BROWN.crust} />
      <path d="M100 104 a40 40 0 0 1 0 44" fill="none" stroke={BROWN.light} strokeWidth="3" opacity="0.8" />
      <path d="M100 100 a44 44 0 0 1 0 52" fill="none" stroke={BROWN.dark} strokeWidth="1.6" opacity="0.5" />
      <ellipse cx="92" cy="112" rx="12" ry="5" fill="#FFFDF7" opacity="0.55" />
      <circle cx="76" cy="104" r="2.4" fill="#C2935A" opacity="0.7" />
      <circle cx="124" cy="112" r="2" fill="#C2935A" opacity="0.7" />
      <circle cx="110" cy="98" r="2.2" fill="#C2935A" opacity="0.7" />
    </svg>
  )
}

export function ProductArt({ illustration, className = 'h-full w-full' }) {
  switch (illustration) {
    case 'croissant':
      return <CroissantArt className={className} />
    case 'sourdough':
      return <SourdoughArt className={className} />
    case 'cinnamon':
      return <CinnamonArt className={className} />
    case 'baguette':
      return <BaguetteArt className={className} />
    case 'muffin':
      return <MuffinArt className={className} />
    case 'macaron':
      return <MacaronArt className={className} />
    case 'cake':
      return <CakeArt className={className} />
    case 'cupcake':
      return <CupcakeArt className={className} />
    case 'cookie':
      return <CookieArt className={className} />
    case 'donut':
      return <DonutArt className={className} />
    case 'tart':
      return <TartArt className={className} />
    case 'eclair':
      return <EclairArt className={className} />
    case 'bread':
      return <BreadArt className={className} />
    default:
      return <SourdoughArt className={className} />
  }
}
