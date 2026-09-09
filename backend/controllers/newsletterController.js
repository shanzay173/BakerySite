import {
  buildNewsletterSubscriberDocument,
  findSubscriberByEmail,
  insertNewsletterSubscriber,
} from '../models/newsletterSubscriberModel.js'
import { sendNewsletterNotification } from '../services/emailService.js'

const EMAIL_REGEX = /^\S+@\S+\.\S+$/
const ALREADY_SUBSCRIBED_MESSAGE = 'Email is already subscribed.'

export async function subscribeNewsletter(req, res) {
  try {
    const email = String(req.body?.email ?? '')
      .trim()
      .toLowerCase()

    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address.' })
    }

    let existingSubscriber
    let savedSubscriber
    try {
      existingSubscriber = await findSubscriberByEmail(email)
      if (!existingSubscriber) {
        savedSubscriber = await insertNewsletterSubscriber(
          buildNewsletterSubscriberDocument(email),
        )
      }
    } catch (error) {
      console.error('Failed to save newsletter subscriber to MongoDB:', error)
      return res.status(500).json({
        error: "Sorry, we couldn't subscribe you right now. Please try again.",
      })
    }

    if (existingSubscriber || savedSubscriber === null) {
      return res.status(409).json({ error: ALREADY_SUBSCRIBED_MESSAGE })
    }

    const emailResult = await sendNewsletterNotification(savedSubscriber)

    return res.status(201).json({
      message: 'You are now subscribed to our newsletter.',
      ownerNotified: emailResult.ownerSent,
    })
  } catch (error) {
    console.error('Unexpected error while saving newsletter subscriber:', error)
    return res.status(500).json({
      error: "Sorry, we couldn't subscribe you right now. Please try again.",
    })
  }
}
