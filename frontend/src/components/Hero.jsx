import { Link } from 'react-router-dom'
import { HeroArt } from './SceneArt.jsx'
import { ArrowRightIcon, CartIcon, LeafIcon } from './icons.jsx'

export default function Hero() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="relative overflow-hidden bg-hero-radial pb-16 pt-28 lg:pb-24 lg:pt-36">
      <div className="container-px relative grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
        <div className="max-w-xl">
          <p className="eyebrow animate-fade-up">
            <LeafIcon className="h-4 w-4" />
            Freshly baked every morning
          </p>

          <h1
            className="mt-6 font-serif text-4xl font-semibold leading-[1.08] text-forest sm:text-5xl lg:text-6xl animate-fade-up"
            style={{ animationDelay: '120ms' }}
          >
            Bread &amp; pastries
            <span className="block italic text-sage-dark">baked with love</span>
            in the heart of town
          </h1>

          <p
            className="mt-6 max-w-md text-base leading-relaxed text-forest/70 sm:text-lg animate-fade-up"
            style={{ animationDelay: '240ms' }}
          >
            Slow-fermented sourdough, buttery croissants and seasonal cakes —
            made from scratch every single morning with honest, local ingredients.
          </p>

          <div
            className="mt-9 flex flex-col gap-4 sm:flex-row animate-fade-up"
            style={{ animationDelay: '360ms' }}
          >
            <Link to="/menu" className="btn-primary group">
              Explore Our Menu
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <button type="button" className="btn-outline group" onClick={() => scrollTo('contact')}>
              <CartIcon className="h-4 w-4" />
              Order Now
            </button>
          </div>

          <dl
            className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4 animate-fade-up"
            style={{ animationDelay: '480ms' }}
          >
            <div>
              <dt className="sr-only">Customer rating</dt>
              <dd className="flex items-center gap-2 text-sm text-forest/70">
                <span className="text-sage-dark" aria-hidden="true">
                  ★★★★★
                </span>
                4.9 from 2,400+ reviews
              </dd>
            </div>
            <div className="hidden h-8 w-px bg-sage/40 sm:block" aria-hidden="true" />
            <div>
              <dt className="sr-only">Baked daily</dt>
              <dd className="flex items-center gap-2 text-sm text-forest/70">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-sage" aria-hidden="true" />
                Baked fresh at 6 AM daily
              </dd>
            </div>
          </dl>
        </div>

        <div className="relative animate-fade-in" style={{ animationDelay: '200ms' }}>
          <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full border border-sage/40" aria-hidden="true" />
          <div className="absolute -bottom-8 left-8 h-20 w-20 rounded-full border-2 border-dashed border-sage/50" aria-hidden="true" />
          <HeroArt className="relative w-full drop-shadow-soft" />
          <div className="absolute -left-4 bottom-10 hidden items-center gap-3 rounded-2xl bg-cream/95 px-5 py-4 shadow-soft backdrop-blur sm:flex animate-bounce-slow">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sage/30 text-forest">
              <LeafIcon className="h-5 w-5" />
            </span>
            <div className="leading-tight">
              <p className="font-serif text-sm font-semibold text-forest">100% Organic</p>
              <p className="text-xs text-forest/60">Locally sourced flour</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
