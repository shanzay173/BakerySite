import { ObjectId } from 'mongodb'
import {
  findProducts,
  countProducts,
  findCategories,
  findProductById,
} from '../models/productModel.js'

export async function getProducts(req, res) {
  try {
    const { page = 1, limit = 20, category, search, featured } = req.query
    const query = {}

    if (category && category !== 'All') {
      query.category = category
    }

    if (featured === 'true') {
      query.featured = true
    }

    if (search) {
      const regex = { $regex: search, $options: 'i' }
      query.$or = [
        { name: regex },
        { category: regex },
        { subcategory: regex },
        { description: regex },
      ]
    }

    const skip = (parseInt(page) - 1) * parseInt(limit)
    const total = await countProducts(query)
    const products = await findProducts(query, skip, parseInt(limit))

    res.json({
      products,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    res.status(500).json({ error: 'Failed to fetch products' })
  }
}

export async function getProductCategories(req, res) {
  try {
    const categories = await findCategories()
    res.json(categories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    res.status(500).json({ error: 'Failed to fetch categories' })
  }
}

export async function getProductById(req, res) {
  try {
    let product

    try {
      product = await findProductById(new ObjectId(req.params.id))
    } catch {
      product = null
    }

    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    res.json(product)
  } catch (error) {
    console.error('Error fetching product:', error)
    res.status(500).json({ error: 'Failed to fetch product' })
  }
}
