import { useState } from 'react'
import { CONTACT_INFO, OPENING_HOURS } from '../data/site.js'
import { apiUrl } from '../utils/api.js'
import Reveal from './Reveal.jsx'
import {
  CheckIcon,
  ClockIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from './icons.jsx'

const initialForm = { name: '', email: '', phone: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (sending) return

    setSending(true)
    setError(null)

    try {
      const res = await fetch(apiUrl('/api/contact'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(
          Array.isArray(data.details) && data.details.length > 0
            ? data.details.join(' ')
            : data.error ||
                "Sorry, we couldn't send your message right now. Please try again.",
        )
      }

      setSent(true)
      setForm(initialForm)
      window.setTimeout(() => setSent(false), 6000)
    } catch (err) {
      setError(
        err.message ||
          "Sorry, we couldn't send your message right now. Please try again.",
      )
    } finally {
      setSending(false)
    }
  }

  const inputClass =
    'w-full rounded-2xl border border-sage/30 bg-cream px-5 py-3.5 text-sm text-forest placeholder:text-forest/40 outline-none transition-all duration-300 focus:border-forest focus:ring-2 focus:ring-sage/40'

  const infoItems = [
    { icon: MapPinIcon, label: 'Visit us', value: CONTACT_INFO.address, href: undefined },
    { icon: PhoneIcon, label: 'Call us', value: CONTACT_INFO.phone, href: `tel:${CONTACT_INFO.phone.replace(/\s/g, '')}` },
    { icon: MailIcon, label: 'Email us', value: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}` },
  ]

  return (
    <section id="contact" className="bg-beige/50 py-20 lg:py-28">
      <div className="container-px">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">
            <span className="h-px w-8 bg-sage" aria-hidden="true" />
            Contact Us
            <span className="h-px w-8 bg-sage" aria-hidden="true" />
          </p>
          <h2 className="section-title mt-4">Let&apos;s bake something together</h2>
          <p className="section-subtitle">
            Questions, custom orders or just saying hello — we&apos;d love to hear
            from you.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="rounded-4xl border border-sage/20 bg-cream p-8 shadow-card sm:p-10"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-forest">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Jane Baker"
                    autoComplete="name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-forest">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="jane@example.com"
                    autoComplete="email"
                    className={inputClass}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="phone" className="mb-2 block text-sm font-medium text-forest">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    autoComplete="tel"
                    className={inputClass}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-forest">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="5"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your order or question..."
                    className={`${inputClass} resize-none`}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={sending}
                className="btn-primary mt-8 w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-60"
              >
                {sending ? 'Sending...' : 'Send Message'}
              </button>

              {error && (
                <p role="alert" className="mt-4 text-sm font-medium text-red-700">
                  {error}
                </p>
              )}

              <p
                role="status"
                aria-live="polite"
                className={`mt-4 flex items-center gap-2 text-sm text-forest transition-all duration-500 ${
                  sent ? 'max-h-10 opacity-100' : 'max-h-0 overflow-hidden opacity-0'
                }`}
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sage/40">
                  <CheckIcon className="h-3.5 w-3.5" />
                </span>
                Thank you! Your message has been received — we&apos;ll get back to you soon.
              </p>
            </form>
          </Reveal>

          <Reveal delay={150} className="lg:col-span-2">
            <div className="flex h-full flex-col gap-6">
              <div className="rounded-4xl border border-sage/20 bg-forest p-8 text-cream shadow-soft sm:p-10">
                <h3 className="font-serif text-2xl font-semibold">Get in touch</h3>
                <p className="mt-2 text-sm text-cream/70">
                  Pop by the shop, give us a call or drop us a line.
                </p>
                <ul className="mt-7 space-y-5">
                  {infoItems.map(({ icon: Icon, label, value, href }) => (
                    <li key={label} className="flex items-start gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sage/25 text-sage-light">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage">
                          {label}
                        </p>
                        {href ? (
                          <a
                            href={href}
                            className="mt-1 block text-sm text-cream/90 transition-colors hover:text-cream"
                          >
                            {value}
                          </a>
                        ) : (
                          <p className="mt-1 text-sm text-cream/90">{value}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-4xl border border-sage/20 bg-cream p-8 shadow-card sm:p-10">
                <h3 className="flex items-center gap-2 font-serif text-2xl font-semibold text-forest">
                  <ClockIcon className="h-5 w-5 text-sage-dark" />
                  Opening Hours
                </h3>
                <ul className="mt-6 divide-y divide-sage/20">
                  {OPENING_HOURS.map(({ days, hours }) => (
                    <li
                      key={days}
                      className="flex items-center justify-between gap-4 py-3.5 text-sm"
                    >
                      <span className="text-forest/75">{days}</span>
                      <span className="font-medium text-forest">{hours}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 rounded-2xl bg-sage/20 px-4 py-3 text-xs leading-relaxed text-forest/70">
                  <span className="font-semibold text-forest">Good to know:</span>{' '}
                  our sourdough sells out fast — reserve your loaf before noon.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
