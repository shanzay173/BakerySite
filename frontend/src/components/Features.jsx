import { FEATURES } from '../data/site.js'
import Reveal from './Reveal.jsx'
import { HandIcon, LeafIcon, RecipeIcon, SmileIcon } from './icons.jsx'

const ICONS = {
  leaf: LeafIcon,
  hand: HandIcon,
  recipe: RecipeIcon,
  smile: SmileIcon,
}

export default function Features() {
  return (
    <section id="why-us" className="bg-beige/50 py-20 lg:py-28">
      <div className="container-px">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">
            <span className="h-px w-8 bg-sage" aria-hidden="true" />
            Why Choose Us
            <span className="h-px w-8 bg-sage" aria-hidden="true" />
          </p>
          <h2 className="section-title mt-4">
            The Hearth &amp; Bloom promise
          </h2>
          <p className="section-subtitle">
            Four simple reasons why our regulars keep coming back — and why
            every first visit turns into a favourite.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, index) => {
            const Icon = ICONS[feature.icon]
            return (
              <Reveal key={feature.title} delay={index * 120}>
                <article className="group h-full rounded-3xl border border-sage/20 bg-cream p-8 text-center shadow-card transition-all duration-500 hover:-translate-y-2 hover:border-sage/40 hover:shadow-glow">
                  <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-sage/25 text-forest transition-all duration-500 group-hover:bg-forest group-hover:text-cream">
                    <Icon className="h-8 w-8" />
                  </span>
                  <h3 className="mt-6 font-serif text-xl font-semibold text-forest">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-forest/65">
                    {feature.description}
                  </p>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
