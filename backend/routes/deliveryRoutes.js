import { Router } from 'express'
import { getDeliveryConfig } from '../controllers/deliveryController.js'

const router = Router()

router.get('/', getDeliveryConfig)

export default router
