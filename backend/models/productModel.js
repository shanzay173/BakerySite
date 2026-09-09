import { getDB } from '../config/db.js'

const COLLECTION = 'Products'

function transformProduct(doc) {
  if (!doc) return null
  const { _id, ...rest } = doc
  return { id: _id.toString(), ...rest }
}

export async function findProducts(query, skip, limit) {
  const products = await getDB()
    .collection(COLLECTION)
    .find(query)
    .skip(skip)
    .limit(limit)
    .toArray()
  return products.map(transformProduct)
}

export async function countProducts(query) {
  return getDB().collection(COLLECTION).countDocuments(query)
}

export async function findCategories() {
  const categories = await getDB().collection(COLLECTION).distinct('category')
  return categories.sort()
}

export async function findProductById(id) {
  const product = await getDB().collection(COLLECTION).findOne({ _id: id })
  return transformProduct(product)
}
