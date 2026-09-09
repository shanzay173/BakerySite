import { getDB } from '../config/db.js'

const COLLECTION = 'newsletter_subscribers'

export function buildNewsletterSubscriberDocument(email) {
  const now = new Date()

  return {
    email,
    createdAt: now,
  }
}

export async function findSubscriberByEmail(email) {
  const collection = getDB().collection(COLLECTION)
  await collection.createIndex({ email: 1 }, { unique: true })
  return collection.findOne({ email })
}

export async function insertNewsletterSubscriber(doc) {
  const collection = getDB().collection(COLLECTION)

  try {
    const result = await collection.insertOne(doc)
    return { ...doc, _id: result.insertedId }
  } catch (error) {
    if (error.code === 11000) return null
    throw error
  }
}
