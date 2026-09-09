/* eslint-disable react/no-unknown-property */

const C = {
  dark: '#A56B3C',
  mid: '#C08A52',
  light: '#DCA96F',
  crust: '#E8C389',
  golden: '#F0D9AC',
  cream: '#FFFDF7',
  beige: '#EFE5D5',
  beigeLight: '#F7F0E3',
  sage: '#A8B5A0',
  sageLight: '#C0CCB8',
  sageDark: '#8B9A82',
  forest: '#344238',
  flour: '#FDF9EF',
}

function Wheat({ cx, cy, height = 170, rotate = 0 }) {
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${rotate})`}>
      <path d={`M0 0 V${-height}`} stroke={C.sageDark} strokeWidth="3.4" strokeLinecap="round" fill="none" />
      {[0.32, 0.48, 0.64, 0.8].map((t) => {
        const y = -height * t
        return (
          <g key={t}>
            <path
              d={`M0 ${y} C-16 ${y + 2} -24 ${y - 8} -20 ${y - 16} C-8 ${y - 14} -2 ${y - 6} 0 ${y} Z`}
              fill={C.sage}
            />
            <path
              d={`M0 ${y} C16 ${y + 2} 24 ${y - 8} 20 ${y - 16} C8 ${y - 14} 2 ${y - 6} 0 ${y} Z`}
              fill={C.sage}
            />
          </g>
        )
      })}
      <path d="M-6 -154 C-12 -160 -8 -168 0 -170 C8 -168 12 -160 6 -154 Z" fill={C.sage} />
    </g>
  )
}

function Steam({ x, y }) {
  return (
    <path
      d={`M${x} ${y} C${x - 8} ${y - 16} ${x + 10} ${y - 26} ${x} ${y - 40} C${x - 10} ${y - 52} ${x + 8} ${y - 62} ${x - 2} ${y - 76}`}
      fill="none"
      stroke={C.sageLight}
      strokeWidth="4"
      strokeLinecap="round"
      opacity="0.7"
    />
  )
}

function Flour({ x, y, r = 3 }) {
  return <circle cx={x} cy={y} r={r} fill={C.flour} opacity="0.85" />
}

export function HeroArt({ className = 'w-full h-auto' }) {
  return (
    <div
      className={`${className} aspect-[640/600] overflow-hidden rounded-4xl bg-beige`}
      role="img"
      aria-label="Freshly baked artisan bread and pastries"
    >
      <img
        src="/images/products/front page image1.jpg"
        alt="Freshly baked artisan bread and pastries"
        loading="eager"
        className="h-full w-full object-cover"
      />
    </div>
  )
}

export function HeroArtIllustration() {
  return (
    <svg viewBox="0 0 640 600" className="w-full h-auto" role="img" aria-label="An illustration of freshly baked artisan bread and pastries">
      <rect width="640" height="600" rx="56" fill={C.beige} />
      <rect x="26" y="26" width="588" height="548" rx="46" fill={C.beigeLight} />
      <circle cx="560" cy="84" r="86" fill="none" stroke={C.sage} strokeOpacity="0.35" strokeWidth="1.6" />
      <circle cx="560" cy="84" r="116" fill="none" stroke={C.sage} strokeOpacity="0.22" strokeWidth="1.4" />
      <circle cx="80" cy="470" r="70" fill="none" stroke={C.sage} strokeOpacity="0.3" strokeWidth="1.6" />
      <circle cx="80" cy="470" r="98" fill="none" stroke={C.sage} strokeOpacity="0.2" strokeWidth="1.4" />

      <Wheat cx="96" cy="500" height="210" rotate="-8" />
      <Wheat cx="545" cy="500" height="230" rotate="8" />
      <Wheat cx="580" cy="505" height="180" rotate="18" />

      <g transform="translate(60 60) scale(0.72)">
        <Wheat cx="0" cy="0" height="150" rotate="-16" />
      </g>

      {/* Table */}
      <rect x="0" y="452" width="640" height="148" fill={C.forest} />
      <rect x="0" y="452" width="640" height="10" fill="#43564A" />
      <path d="M0 452 h640 l0 24 C440 470 200 470 0 476 Z" fill={C.cream} opacity="0.16" />

      {/* Linen cloth */}
      <path
        d="M140 452 L200 452 L240 508 Q250 540 210 548 L120 540 Q92 528 104 496 Z"
        fill={C.cream}
        opacity="0.92"
      />
      <path
        d="M150 470 L210 470"
        stroke={C.sage}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* Sourdough loaf */}
      <g>
        <ellipse cx="330" cy="404" rx="122" ry="74" fill={C.mid} />
        <ellipse cx="330" cy="398" rx="114" ry="64" fill={C.crust} />
        <ellipse cx="308" cy="384" rx="62" ry="28" fill={C.golden} opacity="0.85" />
        <path
          d="M330 372 L346 352 M330 372 L366 358 M330 372 L376 382 M330 372 L362 404 M330 372 L340 414 M330 372 L306 410 M330 372 L284 396 M330 372 L290 372"
          stroke={C.light}
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M330 372 L346 352 M330 372 L366 358 M330 372 L376 382 M330 372 L362 404 M330 372 L340 414 M330 372 L306 410 M330 372 L284 396 M330 372 L290 372"
          stroke={C.dark}
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.55"
        />
        <Steam x="330" y="330" />
        <Steam x="368" y="340" />
      </g>

      {/* Croissant */}
      <g transform="translate(148 356) scale(0.82)">
        <path d="M0 66 C-6 18 34 -14 86 2 C62 16 56 38 80 60 C52 74 14 76 0 66 Z" fill={C.mid} />
        <path d="M7 60 C4 26 38 0 80 12 C62 22 56 40 74 56 C50 66 20 68 7 60 Z" fill={C.light} />
        <path d="M12 54 C11 30 40 10 70 18 C56 26 50 40 64 52 C42 60 22 62 12 54 Z" fill={C.crust} />
        <path d="M16 50 C17 34 40 20 60 24 C50 30 46 40 56 48 C40 54 26 56 16 50 Z" fill={C.golden} />
        <path d="M6 62 L82 14" stroke={C.dark} strokeWidth="2.4" strokeLinecap="round" opacity="0.5" />
      </g>

      {/* Cinnamon roll */}
      <g transform="translate(470 330) scale(0.9)">
        <ellipse cx="0" cy="58" rx="52" ry="26" fill={C.dark} />
        <ellipse cx="0" cy="52" rx="48" ry="22" fill={C.mid} />
        <circle cx="0" cy="48" r="38" fill={C.crust} />
        <path
          d="M0 10 a38 38 0 0 1 0 76 M0 13 a34 34 0 0 0 0 68 M0 18 a29 29 0 0 1 0 58 M0 23 a24 24 0 0 0 0 48 M0 28 a19 19 0 0 1 0 38 M0 33 a14 14 0 0 0 0 28"
          fill="none"
          stroke={C.dark}
          strokeWidth="3.6"
          strokeLinecap="round"
        />
        <path d="M-30 24 c-12 6 -14 16 -8 22 c-4 10 4 18 14 20 c-6 7 -18 4 -23 -6 c-8 -7 -3 -20 11 -25 c3 -1 7 -4 10 -7 Z" fill={C.cream} opacity="0.95" />
        <path d="M30 28 c10 2 16 10 13 18 c9 3 10 13 5 18 c-10 6 -22 0 -21 -10 c-5 -7 -2 -16 6 -19 c0 -3 -1 -5 -3 -7 Z" fill={C.cream} opacity="0.95" />
        <path d="M-2 0 c6 -6 14 -6 16 0 c-6 4 -12 4 -16 0 Z" fill={C.cream} opacity="0.95" />
      </g>

      <Flour x="250" y="452" r="4" />
      <Flour x="300" y="462" r="3" />
      <Flour x="262" y="470" r="3" />
      <Flour x="368" y="460" r="3" />
      <Flour x="402" y="450" r="4" />
      <Flour x="438" y="466" r="3" />
      <Flour x="206" y="452" r="3" />
      <Flour x="180" y="476" r="2.4" />

      <circle cx="120" cy="120" r="5" fill={C.sage} opacity="0.5" />
      <circle cx="150" cy="92" r="3" fill={C.sage} opacity="0.4" />
      <circle cx="520" cy="130" r="4" fill={C.sage} opacity="0.5" />
      <circle cx="556" cy="150" r="3" fill={C.sage} opacity="0.4" />
    </svg>
  )
}

export function AboutArt({ className = 'w-full h-auto' }) {
  return (
    <div
      className={`${className} aspect-[640/600] overflow-hidden rounded-4xl bg-beige`}
      role="img"
      aria-label="Our bakery preparing dough with love"
    >
      <img
        src="/images/products/made with love.jpg"
        alt="Our bakery preparing dough with love"
        loading="lazy"
        className="h-full w-full object-cover"
      />
    </div>
  )
}

export function AboutArtIllustration() {
  return (
    <svg viewBox="0 0 640 600" className="w-full h-auto" role="img" aria-label="An illustration of a baker preparing dough in a mixing bowl">
      <rect width="640" height="600" rx="56" fill={C.beige} />
      <rect x="26" y="26" width="588" height="548" rx="46" fill={C.beigeLight} />

      <circle cx="92" cy="96" r="80" fill="none" stroke={C.sage} strokeOpacity="0.3" strokeWidth="1.6" />
      <circle cx="92" cy="96" r="108" fill="none" stroke={C.sage} strokeOpacity="0.2" strokeWidth="1.4" />
      <circle cx="556" cy="520" r="70" fill="none" stroke={C.sage} strokeOpacity="0.3" strokeWidth="1.6" />

      <g transform="translate(566 500) scale(0.7)"><Wheat cx="0" cy="0" height="170" rotate="-10" /></g>

      {/* Wall shelf with jars */}
      <rect x="420" y="120" width="150" height="10" rx="5" fill={C.sageLight} />
      <rect x="438" y="92" width="36" height="30" rx="6" fill={C.cream} stroke={C.sage} strokeWidth="3" />
      <rect x="488" y="82" width="40" height="40" rx="8" fill={C.sageLight} opacity="0.7" />
      <rect x="542" y="96" width="30" height="26" rx="5" fill={C.beige} stroke={C.sageDark} strokeWidth="2.4" />

      {/* Wooden board */}
      <rect x="90" y="330" width="420" height="180" rx="34" fill="#D6A66B" />
      <rect x="90" y="330" width="420" height="180" rx="34" fill="none" stroke="#B98A50" strokeWidth="3" />
      <path d="M130 420 h240 M150 470 h200 M200 360 h190" stroke="#C2935A" strokeWidth="2.6" strokeLinecap="round" opacity="0.6" />

      {/* Flour dust on board */}
      <ellipse cx="300" cy="440" rx="110" ry="46" fill={C.flour} opacity="0.9" />
      <Flour x="220" y="430" r="4" />
      <Flour x="350" y="452" r="3" />
      <Flour x="270" y="470" r="3" />

      {/* Mixing bowl */}
      <path d="M190 360 a110 110 0 0 0 220 0 Z" fill={C.forest} />
      <ellipse cx="300" cy="360" rx="110" ry="30" fill="#43564A" />
      <ellipse cx="300" cy="358" rx="102" ry="25" fill={C.beigeLight} />
      <path d="M214 360 a86 86 0 0 0 172 0 Z" fill={C.cream} opacity="0.9" />

      {/* Dough in bowl */}
      <ellipse cx="300" cy="340" rx="72" ry="34" fill={C.golden} />
      <path d="M244 334 c-14 8 -22 20 -16 30 c6 12 22 16 36 14 c-10 -4 -14 -12 -8 -20 c6 -6 12 -18 16 -24 Z" fill={C.crust} opacity="0.9" />
      <path d="M352 330 c14 8 20 22 12 32 c-8 10 -24 12 -38 8 c12 -4 16 -14 8 -22 c-6 -6 -10 -14 -12 -22 Z" fill={C.crust} opacity="0.9" />
      <path d="M300 310 c8 -10 22 -10 28 0 c-10 7 -20 7 -28 0 Z" fill={C.cream} opacity="0.9" />
      <path d="M276 322 c6 -8 18 -8 22 0 c-8 6 -16 6 -22 0 Z" fill={C.cream} opacity="0.9" />
      <Steam x="300" y="286" />
      <Steam x="332" y="292" />

      {/* Rolling pin */}
      <g transform="translate(420 452) rotate(-26)">
        <rect x="0" y="-10" width="96" height="20" rx="10" fill={C.light} />
        <rect x="-24" y="-14" width="24" height="28" rx="8" fill={C.dark} />
        <rect x="96" y="-14" width="24" height="28" rx="8" fill={C.dark} />
        <path d="M8 -8 h80 M8 8 h80" stroke="#C08A52" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      </g>

      {/* Small loaf on board */}
      <g transform="translate(180 470) scale(0.8)">
        <ellipse cx="0" cy="26" rx="46" ry="26" fill={C.mid} />
        <ellipse cx="0" cy="22" rx="42" ry="22" fill={C.crust} />
        <path d="M-16 18 L0 6 L16 18" stroke={C.dark} strokeWidth="4" strokeLinecap="round" opacity="0.7" />
        <path d="M0 6 L0 22" stroke={C.dark} strokeWidth="4" strokeLinecap="round" opacity="0.7" />
      </g>

      {/* Wheat sprig lying on board */}
      <g transform="translate(150 400) rotate(-24) scale(0.55)">
        <Wheat cx="0" cy="0" height="120" rotate="0" />
      </g>

      <circle cx="140" cy="130" r="5" fill={C.sage} opacity="0.5" />
      <circle cx="168" cy="150" r="3" fill={C.sage} opacity="0.4" />
      <circle cx="500" cy="180" r="4" fill={C.sage} opacity="0.5" />
    </svg>
  )
}
