import { Router } from 'express'
import {
  getProducts,
  getProductCategories,
  getProductById,
} from '../controllers/productController.js'

const router = Router()

router.get('/', getProducts)
router.get('/categories', getProductCategories)
router.get('/:id', getProductById)

export default router
