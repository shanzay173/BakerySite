import {
  buildContactMessageDocument,
  insertContactMessage,
} from '../models/contactMessageModel.js'
import { sendContactNotification } from '../services/emailService.js'

const EMAIL_REGEX = /^\S+@\S+\.\S+$/

export async function submitContact(req, res) {
  try {
    const name = String(req.body?.name ?? '').trim()
    const email = String(req.body?.email ?? '').trim()
    const phone = String(req.body?.phone ?? '').trim()
    const message = String(req.body?.message ?? '').trim()

    const errors = []
    if (name.length < 2) errors.push('Full name is required.')
    if (!EMAIL_REGEX.test(email)) errors.push('A valid email address is required.')
    if (!message) errors.push('Message is required.')

    if (errors.length > 0) {
      return res.status(400).json({ error: 'Validation failed', details: errors })
    }

    let savedMessage
    try {
      savedMessage = await insertContactMessage(
        buildContactMessageDocument({ name, email, phone, message }),
      )
    } catch (error) {
      console.error('Failed to save contact message to MongoDB:', error)
      return res.status(500).json({
        error: "Sorry, we couldn't send your message right now. Please try again.",
      })
    }

    const emailResult = await sendContactNotification(savedMessage)

    return res.status(201).json({
      message: 'Your message has been received.',
      ownerNotified: emailResult.ownerSent,
      id: savedMessage._id,
    })
  } catch (error) {
    console.error('Unexpected error while saving contact message:', error)
    return res.status(500).json({
      error: "Sorry, we couldn't send your message right now. Please try again.",
    })
  }
}
