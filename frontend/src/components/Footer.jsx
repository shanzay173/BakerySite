import { useState } from 'react'
import { Link } from 'react-router-dom'
import { COMPANY, CONTACT_INFO } from '../data/site.js'
import { apiUrl } from '../utils/api.js'
import Logo from './Logo.jsx'
import { CheckIcon, MailIcon, MapPinIcon, PhoneIcon, SocialIcon } from './icons.jsx'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Menu', to: '/menu' },
  { label: 'About Us', to: '/#about' },
  { label: 'Contact', to: '/contact' },
]

const SOCIALS = ['instagram', 'facebook', 'tiktok']

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribing, setSubscribing] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const [error, setError] = useState(null)

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (subscribing || !email) return

    setSubscribing(true)
    setError(null)

    try {
      const res = await fetch(apiUrl('/api/newsletter'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(
          data.error ||
            "Sorry, we couldn't subscribe you right now. Please try again.",
        )
      }

      setSubscribed(true)
      setEmail('')
      window.setTimeout(() => setSubscribed(false), 5000)
    } catch (err) {
      setError(
        err.message ||
          "Sorry, we couldn't subscribe you right now. Please try again.",
      )
    } finally {
      setSubscribing(false)
    }
  }

  const year = new Date().getFullYear()

  return (
    <footer className="bg-forest text-cream">
      <div className="container-px grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:py-20">
        <div className="sm:col-span-2 lg:col-span-4">
          <Logo variant="dark" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/65">
            {COMPANY.description}
          </p>
          <ul className="mt-6 space-y-3 text-sm text-cream/75">
            <li className="flex items-start gap-3">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
              {CONTACT_INFO.address}
            </li>
            <li className="flex items-start gap-3">
              <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
              <a href="tel:+15550123467" className="transition-colors hover:text-cream">
                {CONTACT_INFO.phone}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
              <a href="mailto:hello@hearthandbloom.com" className="transition-colors hover:text-cream">
                {CONTACT_INFO.email}
              </a>
            </li>
          </ul>
          <div className="mt-7 flex items-center gap-3">
            {SOCIALS.map((name) => (
              <a
                key={name}
                href={`https://${name}.com/hearthandbloom`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow us on ${name}`}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 text-cream/80 transition-all duration-300 hover:-translate-y-1 hover:border-sage hover:bg-sage hover:text-forest"
              >
                <SocialIcon name={name} />
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-sage">
            Quick Links
          </h3>
          <ul className="mt-5 space-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="group inline-flex items-center gap-2 text-sm text-cream/70 transition-colors hover:text-cream"
                >
                  <span className="h-px w-0 bg-sage transition-all duration-300 group-hover:w-4" aria-hidden="true" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-sage">
            Opening Hours
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-cream/75">
            <li className="flex items-center justify-between gap-4">
              <span>Mon – Fri</span>
              <span className="text-cream">7:00 AM – 7:00 PM</span>
            </li>
            <li className="flex items-center justify-between gap-4">
              <span>Saturday</span>
              <span className="text-cream">8:00 AM – 6:00 PM</span>
            </li>
            <li className="flex items-center justify-between gap-4">
              <span>Sunday</span>
              <span className="text-cream">8:00 AM – 2:00 PM</span>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-sage">
            Fresh in your inbox
          </h3>
          <p className="mt-5 text-sm leading-relaxed text-cream/65">
            Join our newsletter for the weekly bake list, seasonal treats and
            special offers.
          </p>
          <form onSubmit={handleSubscribe} className="mt-5">
            <div className="flex items-center gap-2 rounded-full border border-cream/20 bg-cream/5 p-1.5 focus-within:border-sage">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                autoComplete="email"
                className="w-full bg-transparent px-4 text-sm text-cream placeholder:text-cream/40 outline-none"
              />
              <button
                type="submit"
                disabled={subscribing}
                className="shrink-0 rounded-full bg-sage px-5 py-2.5 text-sm font-medium text-forest transition-colors duration-300 hover:bg-sage-light disabled:cursor-not-allowed disabled:opacity-60"
              >
                {subscribing ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
            {error && (
              <p role="alert" className="mt-3 text-xs font-medium text-red-300">
                {error}
              </p>
            )}
            <p
              role="status"
              aria-live="polite"
              className={`mt-3 flex items-center gap-2 text-xs text-sage-light transition-all duration-500 ${
                subscribed ? 'max-h-8 opacity-100' : 'max-h-0 overflow-hidden opacity-0'
              }`}
            >
              <CheckIcon className="h-3.5 w-3.5" />
              You&apos;re subscribed — welcome to the family!
            </p>
          </form>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-px flex flex-col items-center justify-between gap-3 py-6 text-xs text-cream/55 sm:flex-row">
          <p>© {year} {COMPANY.name} {COMPANY.tagline}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#home" onClick={(e) => e.preventDefault()} className="transition-colors hover:text-cream">
              Privacy Policy
            </a>
            <a href="#home" onClick={(e) => e.preventDefault()} className="transition-colors hover:text-cream">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
