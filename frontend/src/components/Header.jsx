import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../context/useCart.js'
import { CartIcon, CloseIcon, MenuIcon } from './icons.jsx'
import Logo from './Logo.jsx'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Menu', to: '/menu' },
  { label: 'About', to: '/#about' },
  { label: 'Contact', to: '/contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname, hash } = useLocation()
  const navigate = useNavigate()
  const { count } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname, hash])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const isActive = (link) => {
    if (link.to === '/') return pathname === '/' && !hash
    if (link.to === '/menu') return pathname === '/menu' || pathname.startsWith('/product')
    if (link.to === '/#about') return pathname === '/' && hash === '#about'
    if (link.to === '/contact') return pathname.startsWith('/contact')
    return false
  }

  const goToMenu = () => {
    setOpen(false)
    navigate('/menu')
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'bg-cream/95 shadow-soft backdrop-blur-md'
          : 'bg-cream/60 backdrop-blur-sm'
      }`}
    >
      <div className="container-px flex h-20 items-center justify-between">
        <Logo />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  aria-current={isActive(link) ? 'page' : undefined}
                  className={`relative text-sm font-medium tracking-wide transition-colors duration-300 after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:rounded-full after:bg-sage after:transition-all after:duration-300 ${
                    isActive(link)
                      ? 'text-forest after:w-full'
                      : 'text-forest/70 after:w-0 hover:text-forest hover:after:w-full'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <Link
            to="/cart"
            aria-label={`View cart, ${count} item${count === 1 ? '' : 's'}`}
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full text-forest transition-colors duration-300 hover:bg-sage/25"
          >
            <CartIcon className="h-6 w-6" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-forest px-1 text-[0.65rem] font-semibold text-cream">
                {count}
              </span>
            )}
          </Link>
          <button type="button" className="btn-primary group" onClick={goToMenu}>
            Order Now
            <CartIcon className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Link
            to="/cart"
            aria-label={`View cart, ${count} item${count === 1 ? '' : 's'}`}
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full text-forest transition-colors hover:bg-sage/25"
          >
            <CartIcon className="h-6 w-6" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-forest px-1 text-[0.65rem] font-semibold text-cream">
                {count}
              </span>
            )}
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-forest transition-colors hover:bg-sage/25"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`lg:hidden ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <div
          className={`overflow-hidden transition-[max-height,opacity,transform] duration-500 ease-out ${
            open ? 'max-h-[26rem] opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2'
          }`}
        >
          <nav aria-label="Mobile" className="container-px border-t border-sage/20 pb-8 pt-6">
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    aria-current={isActive(link) ? 'page' : undefined}
                    className={`block rounded-xl px-4 py-3 font-serif text-lg transition-colors duration-300 ${
                      isActive(link)
                        ? 'bg-sage/25 text-forest'
                        : 'text-forest/80 hover:bg-beige hover:text-forest'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <button type="button" className="btn-primary mt-6 w-full" onClick={goToMenu}>
              Order Now
              <CartIcon className="h-4 w-4" />
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}
