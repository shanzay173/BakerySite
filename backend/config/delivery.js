export const HOME_CITY = 'Lahore'

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

export function isHomeCity(city) {
  return String(city ?? '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ') === HOME_CITY.toLowerCase()
}

export function getZoneForCity(city) {
  return isHomeCity(city) ? DELIVERY_ZONES.home : DELIVERY_ZONES.courier
}
