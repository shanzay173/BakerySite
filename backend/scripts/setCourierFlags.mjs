import { MongoClient } from 'mongodb'
import 'dotenv/config'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const DB_NAME = process.env.DB_NAME || 'BakeryDB'

// Products that survive courier shipping to cities outside Lahore.
// Everything else (fresh cream cakes, pastries, pizza, burgers, sandwiches,
// donuts, bread, puffs, snacks, cold drinks) is Lahore-delivery only.
const COURIER_CATEGORIES = ['Nimko', 'Biscuits']
const COURIER_CAKE_SUBCATEGORIES = ['Dry Cakes', 'Tea Cake']

function isCourierAllowed(product) {
  const name = String(product.name || '')
  if (/brownie/i.test(name)) return true
  if (/rusk/i.test(name)) return true
  if (COURIER_CATEGORIES.includes(product.category)) return true
  if (
    product.category === 'Cakes' &&
    COURIER_CAKE_SUBCATEGORIES.includes(product.subcategory)
  ) {
    return true
  }
  return false
}

async function main() {
  const client = new MongoClient(MONGODB_URI)
  await client.connect()
  const collection = client.db(DB_NAME).collection('Products')

  const products = await collection.find({ courierAllowed: { $exists: false } }).toArray()
  let allowed = 0
  let lahoreOnly = 0

  for (const product of products) {
    const courierAllowed = isCourierAllowed(product)
    await collection.updateOne(
      { _id: product._id },
      { $set: { courierAllowed } },
    )
    if (courierAllowed) allowed += 1
    else lahoreOnly += 1
  }

  console.log(`Updated ${products.length} scanned documents.`)
  console.log(`Courer-allowed: ${allowed} | Lahore-only: ${lahoreOnly}`)
  await client.close()
}

main().catch((error) => {
  console.error('Migration failed:', error)
  process.exit(1)
})
