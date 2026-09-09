import { STATS } from '../data/site.js'
import { AboutArt } from './SceneArt.jsx'
import Reveal from './Reveal.jsx'
import { WheatIcon } from './icons.jsx'

export default function About() {
  return (
    <section id="about" className="overflow-hidden py-20 lg:py-28">
      <div className="container-px grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="relative order-2 lg:order-1">
          <div className="absolute -left-6 -top-6 h-28 w-28 rounded-full border border-sage/40" aria-hidden="true" />
          <div className="absolute -bottom-8 right-8 h-24 w-24 rounded-2xl border-2 border-dashed border-sage/50" aria-hidden="true" />
          <AboutArt className="relative w-full drop-shadow-soft" />

          <div className="absolute -bottom-6 left-8 rounded-2xl bg-forest px-7 py-5 text-cream shadow-soft sm:left-12">
            <p className="font-serif text-3xl font-semibold leading-none">Since 2012</p>
            <p className="mt-1.5 text-xs uppercase tracking-[0.2em] text-cream/70">
              Baking with heart
            </p>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="eyebrow">
              <WheatIcon className="h-4 w-4" />
              About Our Bakery
            </p>
            <h2 className="section-title mt-4">
              Baked with love,<span className="block italic text-sage-dark">shared with joy</span>
            </h2>
            <p className="section-subtitle">
              Hearth &amp; Bloom began as a tiny family kitchen with a single
              sourdough starter and a big dream. Today we still measure success
              the same way — one warm loaf, one smiling face at a time.
            </p>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-6 leading-relaxed text-forest/70">
              Every recipe starts with stone-milled flour from local farms,
              hand-churned butter and fruit picked at peak ripeness. We knead,
              shape and bake by hand in small batches, letting each loaf take
              the time it needs to develop its deep, honest flavour.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                'Stone-milled flour from family farms',
                'Slow-fermented dough, never rushed',
                'Seasonal fruits and honest ingredients',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-forest/80 sm:text-base">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sage/30">
                    <span className="h-1.5 w-1.5 rounded-full bg-sage-dark" aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={260}>
            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-sage/30 pt-8">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-serif text-3xl font-semibold text-forest sm:text-4xl">
                    {stat.value}
                  </dd>
                  <dd className="mt-1 text-xs leading-snug text-forest/60 sm:text-sm">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
