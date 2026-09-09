import { createContext } from 'react'

export const CartContext = createContext(null)

export function itemKey(item) {
  return item.variantLabel ? `${item.id}::${item.variantLabel}` : String(item.id)
}
