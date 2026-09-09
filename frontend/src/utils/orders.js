const ORDER_KEY = 'hearth-and-bloom-order'

// Legacy reader: orders are now created and stored by the backend (MongoDB).
// This only exists so a previously placed local order can still be displayed.
export function loadOrder() {
  try {
    const raw = window.localStorage.getItem(ORDER_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}
