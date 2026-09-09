import { TESTIMONIALS } from '../data/site.js'
import Reveal from './Reveal.jsx'
import { StarIcon } from './icons.jsx'

function Stars({ rating }) {
  return (
    <div
      className="flex items-center gap-1 text-sage-dark"
      role="img"
      aria-label={`Rated ${rating} out of 5 stars`}
    >
      {Array.from({ length: rating }).map((_, i) => (
        <StarIcon key={i} className="h-4 w-4" />
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 lg:py-28">
      <div className="container-px">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">
            <span className="h-px w-8 bg-sage" aria-hidden="true" />
            Testimonials
            <span className="h-px w-8 bg-sage" aria-hidden="true" />
          </p>
          <h2 className="section-title mt-4">What our customers say</h2>
          <p className="section-subtitle">
            A few kind words from the people who share our bread at their table.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-7 md:grid-cols-3">
          {TESTIMONIALS.map((item, index) => (
            <Reveal key={item.name} delay={index * 130}>
              <figure className="group flex h-full flex-col rounded-3xl border border-sage/20 bg-cream p-8 shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-glow">
                <span className="font-serif text-6xl leading-none text-sage/60 transition-colors duration-500 group-hover:text-sage" aria-hidden="true">
                  &ldquo;
                </span>
                <Stars rating={item.rating} />
                <blockquote className="mt-4 flex-1">
                  <p className="text-sm leading-relaxed text-forest/75 sm:text-base">
                    {item.review}
                  </p>
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-4 border-t border-sage/25 pt-6">
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-forest font-serif text-sm font-semibold text-cream"
                    aria-hidden="true"
                  >
                    {item.initials}
                  </span>
                  <div>
                    <p className="font-serif text-base font-semibold text-forest">
                      {item.name}
                    </p>
                    <p className="text-xs text-forest/55">{item.role}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
