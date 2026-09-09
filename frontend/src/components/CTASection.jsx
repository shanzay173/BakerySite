import Reveal from './Reveal.jsx'
import { CartIcon, ClockIcon } from './icons.jsx'

export default function CTASection() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section aria-labelledby="cta-heading" className="bg-cream py-10 lg:py-14">
      <div className="container-px">
        <Reveal>
          <div className="relative overflow-hidden rounded-4xl bg-forest bg-cta-radial px-6 py-16 text-center shadow-soft sm:px-12 lg:py-20">
            <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full border border-sage/30" aria-hidden="true" />
            <div className="pointer-events-none absolute -bottom-20 -right-14 h-64 w-64 rounded-full border-2 border-dashed border-sage/25" aria-hidden="true" />
            <div className="pointer-events-none absolute left-10 top-10 h-4 w-4 rotate-45 bg-sage/40" aria-hidden="true" />
            <div className="pointer-events-none absolute bottom-12 right-16 h-3 w-3 rounded-full bg-sage/40" aria-hidden="true" />

            <div className="relative mx-auto max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sage">
                Fresh out of the oven
              </p>
              <h2
                id="cta-heading"
                className="mt-4 font-serif text-3xl font-semibold leading-tight text-cream sm:text-4xl lg:text-5xl"
              >
                Craving something warm &amp; wonderful?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-cream/75 sm:text-lg">
                Place your order now and pick it up fresh this morning — or have
                it delivered to your door while it&apos;s still warm.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <button
                  type="button"
                  className="btn-sage group w-full sm:w-auto"
                  onClick={() => scrollTo('contact')}
                >
                  Order Now
                  <CartIcon className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                </button>
                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-cream/30 px-7 py-3 text-sm font-medium text-cream transition-all duration-300 hover:border-cream hover:bg-cream hover:text-forest sm:w-auto"
                  onClick={() => scrollTo('menu')}
                >
                  <ClockIcon className="h-4 w-4" />
                  View Opening Hours
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
