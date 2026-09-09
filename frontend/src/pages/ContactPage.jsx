import { useState } from 'react'
import Button from '../components/Button.jsx'
import FormInput from '../components/FormInput.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import {
  CheckIcon,
  ClockIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  SocialIcon,
} from '../components/icons.jsx'
import { CONTACT_INFO, OPENING_HOURS } from '../data/site.js'
import { apiUrl } from '../utils/api.js'

const initialForm = { name: '', email: '', phone: '', message: '' }

const SOCIALS = [
  { name: 'instagram', url: 'https://instagram.com/hearthandbloom' },
  { name: 'facebook', url: 'https://facebook.com/hearthandbloom' },
  { name: 'tiktok', url: 'https://tiktok.com/@hearthandbloom' },
]

const infoItems = [
  {
    icon: MapPinIcon,
    label: 'Visit us',
    value: CONTACT_INFO.address,
    href: undefined,
  },
  {
    icon: PhoneIcon,
    label: 'Call us',
    value: CONTACT_INFO.phone,
    href: `tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`,
  },
  {
    icon: MailIcon,
    label: 'Email us',
    value: CONTACT_INFO.email,
    href: `mailto:${CONTACT_INFO.email}`,
  },
]

export default function ContactPage() {
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

  return (
    <>
      <PageHeader
        eyebrow="Contact Us"
        title="Let's bake something together"
        subtitle="Questions, custom orders or just saying hello — we'd love to hear from you."
      />

      <section className="pb-20 lg:pb-28">
        <div className="container-px grid gap-8 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="rounded-4xl border border-sage/20 bg-cream p-7 shadow-card sm:p-10"
            >
              <h2 className="font-serif text-xl font-semibold text-forest">Send us a message</h2>
              <p className="mt-2 text-sm text-forest/60">
                We usually reply within one working day.
              </p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <FormInput
                  label="Full Name"
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Jane Baker"
                  autoComplete="name"
                />
                <FormInput
                  label="Email"
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="jane@example.com"
                  autoComplete="email"
                />
                <div className="sm:col-span-2">
                  <FormInput
                    label="Phone Number"
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    autoComplete="tel"
                  />
                </div>
                <div className="sm:col-span-2">
                  <FormInput
                    label="Message"
                    id="message"
                    name="message"
                    textarea
                    rows="5"
                    required
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your order or question..."
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="mt-8 w-full sm:w-auto"
                disabled={sending}
              >
                {sending ? 'Sending...' : 'Send Message'}
              </Button>

              {error && (
                <p
                  role="alert"
                  className="mt-4 text-sm font-medium text-red-700"
                >
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
                <h2 className="font-serif text-2xl font-semibold">Get in touch</h2>
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

                <div className="mt-8 border-t border-cream/15 pt-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage">
                    Follow along
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    {SOCIALS.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Follow us on ${social.name}`}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/15 text-cream/80 transition-all duration-300 hover:-translate-y-1 hover:border-sage hover:bg-sage hover:text-forest"
                      >
                        <SocialIcon name={social.name} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-4xl border border-sage/20 bg-cream p-8 shadow-card sm:p-10">
                <h2 className="flex items-center gap-2 font-serif text-2xl font-semibold text-forest">
                  <ClockIcon className="h-5 w-5 text-sage-dark" />
                  Opening Hours
                </h2>
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
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
