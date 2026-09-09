import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import ScrollManager from './components/ScrollManager.jsx'
import { CartProvider } from './context/CartContext.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import ContactPage from './pages/ContactPage.jsx'
import Home from './pages/Home.jsx'
import Menu from './pages/Menu.jsx'
import OrderSuccess from './pages/OrderSuccess.jsx'
import ProductDetails from './pages/ProductDetails.jsx'

function NotFound() {
  return (
    <section className="bg-beige/50 pb-20 pt-28 lg:pb-28 lg:pt-36">
      <div className="container-px text-center">
        <p className="font-serif text-3xl font-semibold text-forest">Page not found</p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-forest/65">
          This page has cooled off and disappeared. Let&apos;s take you back somewhere warm.
        </p>
        <Link to="/" className="btn-primary mt-8">
          Back to Home
        </Link>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-forest focus:px-5 focus:py-3 focus:text-sm focus:text-cream"
        >
          Skip to content
        </a>
        <ScrollManager />
        <Header />
        <main id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </CartProvider>
    </BrowserRouter>
  )
}
