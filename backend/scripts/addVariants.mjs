import { MongoClient } from 'mongodb'
import 'dotenv/config'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const DB_NAME = process.env.DB_NAME || 'BakeryDB'

const GRAM_VARIANT_RULES = [
  { label: '250 g', factor: 1 },
  { label: '500 g', factor: 2 },
  { label: '1 kg', factor: 4 },
]

const PIZZA_SIZE_DELTAS = [
  { label: 'Small', delta: 0 },
  { label: 'Medium', delta: 400 },
  { label: 'Large', delta: 890 },
]

const SINGLE_PIECE_CATEGORIES = [
  'Bread',
  'Burger',
  'Cold Drinks',
  'Donuts',
  'Pastry',
  'Puff',
  'Sandwich',
]

const roundTo = (value, step) => Math.round(value / step) * step

function buildVariants(product) {
  const price = product.price

  switch (product.category) {
    case 'Nimko':
    case 'Biscuits':
      return GRAM_VARIANT_RULES.map(({ label, factor }) => ({
        label,
        price: roundTo(price * factor, 10),
      }))

    case 'Snack': {
      const isMiniPizza = /mini/i.test(product.name || '')
      return [{ label: isMiniPizza ? '1 Piece' : '6 Pieces', price }]
    }

    case 'Cakes': {
      if (product.size === '2 Pound') {
        return [
          { label: '1 Pound', price: roundTo(price / 1.9, 50) },
          { label: '2 Pounds', price },
        ]
      }
      return [
        { label: '1 Pound', price },
        { label: '2 Pounds', price: roundTo(price * 1.9, 50) },
      ]
    }

    case 'Pizza':
      return PIZZA_SIZE_DELTAS.map(({ label, delta }) => ({
        label,
        price: price + delta,
      }))

    default:
      if (SINGLE_PIECE_CATEGORIES.includes(product.category)) {
        return [{ label: '1 Piece', price }]
      }
      return null
  }
}

async function main() {
  const client = new MongoClient(MONGODB_URI)
  await client.connect()
  const collection = client.db(DB_NAME).collection('Products')

  const products = await collection.find({ variants: { $exists: false } }).toArray()
  const summary = {}

  for (const product of products) {
    const variants = buildVariants(product)
    if (!variants) continue
    await collection.updateOne({ _id: product._id }, { $set: { variants } })
    summary[product.category] = (summary[product.category] || 0) + 1
  }

  console.log(`Updated ${products.length} scanned documents.`)
  console.log('Variants added per category:', JSON.stringify(summary, null, 2))
  await client.close()
}

main().catch((error) => {
  console.error('Migration failed:', error)
  process.exit(1)
})
