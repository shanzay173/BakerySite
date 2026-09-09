export const DELIVERY_FEE_UNDER_THRESHOLD = 100
export const DELIVERY_FEE_ABOVE_THRESHOLD = 300
export const DELIVERY_FEE_THRESHOLD = 2000

export function getDeliveryFee(subtotal) {
  if (subtotal <= 0) return 0
  return subtotal > DELIVERY_FEE_THRESHOLD
    ? DELIVERY_FEE_ABOVE_THRESHOLD
    : DELIVERY_FEE_UNDER_THRESHOLD
}

export function formatPrice(amount) {
  return `Rs. ${Number(amount).toFixed(2)}`
}

export const HOME_CITY = 'Lahore'

export function isHomeCity(city) {
  return String(city ?? '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ') === HOME_CITY.toLowerCase()
}

export const DELIVERY_ZONES = {
  home: {
    id: 'home',
    label: 'Lahore',
    etaLabel: 'Same Day Delivery (2–4 hours)',
    sameDay: true,
    customCakeNote: 'Custom cakes require 1–2 days advance order.',
  },
  courier: {
    id: 'courier',
    label: 'Other Cities',
    etaLabel: '2–4 working days',
    sameDay: false,
    customCakeNote: null,
  },
}

export function getZoneForCity(city) {
  return isHomeCity(city) ? DELIVERY_ZONES.home : DELIVERY_ZONES.courier
}
