export const DELIVERY_FEE_UNDER_THRESHOLD = 100
export const DELIVERY_FEE_ABOVE_THRESHOLD = 300
export const DELIVERY_FEE_THRESHOLD = 2000

export function getDeliveryFee(subtotal) {
  if (subtotal <= 0) return 0
  return subtotal > DELIVERY_FEE_THRESHOLD
    ? DELIVERY_FEE_ABOVE_THRESHOLD
    : DELIVERY_FEE_UNDER_THRESHOLD
}

export function formatPKR(amount) {
  return `PKR ${Number(amount).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}
