import { getDB } from '../config/db.js'

const COLLECTION = 'contact_messages'

export function buildContactMessageDocument({ name, email, phone, message }) {
  const now = new Date()

  return {
    name,
    email,
    phone: phone || null,
    message,
    createdAt: now,
  }
}

export async function insertContactMessage(doc) {
  const collection = getDB().collection(COLLECTION)
  const result = await collection.insertOne(doc)
  return { ...doc, _id: result.insertedId }
}
