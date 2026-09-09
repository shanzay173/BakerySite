import { MongoClient } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const DB_NAME = process.env.DB_NAME || 'BakeryDB'

let db

export async function connectDB() {
  try {
    const client = new MongoClient(MONGODB_URI)
    await client.connect()
    db = client.db(DB_NAME)
    console.log(`Connected to MongoDB: ${DB_NAME}`)
  } catch (error) {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  }
}

export function getDB() {
  return db
}
