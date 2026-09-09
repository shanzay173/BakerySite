import { Router } from 'express'
import {
  DELIVERY_FEE_ABOVE_THRESHOLD,
  DELIVERY_FEE_THRESHOLD,
  DELIVERY_FEE_UNDER_THRESHOLD,
} from '../config/pricing.js'
import { DELIVERY_ZONES, HOME_CITY } from '../config/delivery.js'

export function getDeliveryConfig(req, res) {
  res.json({
    homeCity: HOME_CITY,
    zones: Object.values(DELIVERY_ZONES),
    charges: {
      underThreshold: DELIVERY_FEE_UNDER_THRESHOLD,
      aboveThreshold: DELIVERY_FEE_ABOVE_THRESHOLD,
      threshold: DELIVERY_FEE_THRESHOLD,
    },
  })
}
