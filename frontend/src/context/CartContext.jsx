import { useEffect, useMemo, useState } from 'react'
import { CartContext, itemKey } from './cartContext.js'

const STORAGE_KEY = 'hearth-and-bloom-cart'

function loadCart() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* storage unavailable — cart lives in memory only */
    }
  }, [items])

  const addItem = (product, quantity = 1) => {
    const qty = Math.max(1, Math.floor(quantity))
    const key = itemKey(product)
    setItems((prev) => {
      const existing = prev.find((item) => itemKey(item) === key)
      if (existing) {
        return prev.map((item) =>
          itemKey(item) === key
            ? { ...item, quantity: Math.min(99, item.quantity + qty) }
            : item,
        )
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          illustration: product.illustration,
          variantLabel: product.variantLabel,
          lahoreOnly: product.courierAllowed === false,
          category: product.category,
          subcategory: product.subcategory,
          quantity: qty,
        },
      ]
    })
  }

  const removeItem = (key) => {
    setItems((prev) => prev.filter((item) => itemKey(item) !== key))
  }

  const updateQuantity = (key, quantity) => {
    if (quantity < 1) return
    setItems((prev) =>
      prev.map((item) =>
        itemKey(item) === key ? { ...item, quantity: Math.min(99, Math.floor(quantity)) } : item,
      ),
    )
  }

  const clearCart = () => setItems([])

  const value = useMemo(() => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0)
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const hasLahoreOnly = items.some((item) => item.lahoreOnly === true)
    return { items, count, subtotal, hasLahoreOnly, addItem, removeItem, updateQuantity, clearCart }
  }, [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
