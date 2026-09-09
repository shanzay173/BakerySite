import nodemailer from 'nodemailer'
import { formatPKR } from '../config/pricing.js'

const BAKERY_NAME = process.env.BAKERY_NAME || 'Hearth & Bloom'
const OWNER_EMAIL = process.env.OWNER_EMAIL || ''
const FROM_EMAIL = process.env.FROM_EMAIL || process.env.SMTP_USER || ''

let transporter = null

function getTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD) return null

  if (!transporter) {
    const port = Number(SMTP_PORT) || 587
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
    })
  }

  return transporter
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function formatTimestamp(date) {
  return new Date(date).toLocaleString([], {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

function wrapEmail(innerHtml) {
  return `
    <div style="background-color:#EFE5D5;padding:32px 16px;font-family:'Jost',system-ui,'Segoe UI',sans-serif;">
      <div style="max-width:600px;margin:0 auto;background-color:#FFFDF7;border-radius:16px;overflow:hidden;border:1px solid #A8B5A0;">
        <div style="background-color:#344238;padding:28px 32px;text-align:center;">
          <h1 style="color:#FFFDF7;font-family:'Playfair Display',Georgia,serif;font-size:24px;margin:0;">${BAKERY_NAME}</h1>
          <p style="color:#C0CCB8;font-size:12px;letter-spacing:3px;text-transform:uppercase;margin:6px 0 0;">Artisan Bakery</p>
        </div>
        <div style="padding:32px;color:#344238;font-size:14px;line-height:1.7;">
          ${innerHtml}
        </div>
        <div style="background-color:#F6F0E3;padding:18px 32px;text-align:center;color:#8B9A82;font-size:12px;">
          &copy; ${new Date().getFullYear()} ${BAKERY_NAME} — Baked fresh every morning.
        </div>
      </div>
    </div>
  `
}

function itemsListHtml(order) {
  return order.items
    .map(
      (item) => `
        <li style="margin-bottom:10px;">
          <strong>${item.name}</strong> &times; ${item.quantity}
          ${item.variantLabel ? `<br /><span style="color:#8B9A82;font-size:13px;">Option: ${item.variantLabel}</span>` : ''}
          <br /><span style="font-size:13px;">${formatPKR(item.unitPrice)} each — ${formatPKR(item.lineTotal)}</span>
        </li>`,
    )
    .join('')
}

function customerEmailHtml(order) {
  return wrapEmail(`
    <p>Dear ${order.customer.name},</p>
    <p>Thank you for visiting our website and placing your order with us!</p>
    <p>Your order has been successfully received.</p>

    <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:17px;border-bottom:2px solid #C0CCB8;padding-bottom:6px;">Order Details</h2>
    <p><strong>Order ID:</strong> #${order.orderId} &nbsp;&middot;&nbsp; <strong>Status:</strong> ${order.status}</p>

    <ul style="padding-left:20px;margin:14px 0;">${itemsListHtml(order)}</ul>

    <table style="width:100%;font-size:14px;margin-top:14px;">
      <tr><td style="padding:4px 0;color:#5c6b60;">Subtotal</td><td align="right">${formatPKR(order.subtotal)}</td></tr>
      <tr><td style="padding:4px 0;color:#5c6b60;">Delivery Charges</td><td align="right">${formatPKR(order.deliveryFee)}</td></tr>
      <tr><td style="padding:10px 0;font-weight:bold;border-top:1px solid #C0CCB8;">Total</td><td align="right" style="font-weight:bold;font-size:16px;border-top:1px solid #C0CCB8;">${formatPKR(order.total)}</td></tr>
    </table>

    <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:17px;border-bottom:2px solid #C0CCB8;padding-bottom:6px;margin-top:28px;">Delivery Information</h2>
    <p>Your order will be delivered to:</p>
    <p style="margin-left:8px;">
      ${order.customer.name}<br />
      ${order.customer.address}<br />
      ${order.customer.city}${order.customer.postalCode ? `, ${order.customer.postalCode}` : ''}<br />
      ${order.customer.phone}
    </p>
    <p>Delivery zone: <strong>${order.deliveryZone === 'home' ? 'Lahore (Same Day)' : 'Other City (Courier)'}</strong></p>
    <p>Your purchased items are expected to arrive within <strong>${order.etaLabel}</strong>.</p>
    ${order.customCakeNote ? `<p style="background-color:#F6F0E3;border-left:4px solid #A8B5A0;padding:10px 14px;"><em>Note: ${order.customCakeNote}</em></p>` : ''}

    <p>Thank you for choosing our bakery. We hope you enjoy your order!</p>
    <p style="margin-bottom:0;">Best regards,<br /><strong>${BAKERY_NAME}</strong></p>
  `)
}

const TH = 'padding:10px 12px;background-color:#344238;color:#FFFDF7;text-align:left;font-size:12px;'
const TD = 'padding:10px 12px;border-bottom:1px solid #EFE5D5;font-size:13px;'
const TDR = `${TD}text-align:right;`

function ownerEmailHtml(order) {
  const rows = order.items
    .map(
      (item) => `
        <tr>
          <td style="${TD}">${item.name}</td>
          <td style="${TD}">${item.variantLabel || '—'}</td>
          <td style="${TDR}">${item.quantity}</td>
          <td style="${TDR}">${formatPKR(item.lineTotal)}</td>
        </tr>`,
    )
    .join('')

  const placedAt = new Date(order.createdAt).toLocaleString([], {
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  return wrapEmail(`
    <p>A new order has been placed on the bakery website.</p>

    <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:17px;border-bottom:2px solid #C0CCB8;padding-bottom:6px;">Customer Details</h2>
    <p style="margin-left:8px;">
      <strong>Name:</strong> ${order.customer.name}<br />
      <strong>Email:</strong> ${order.customer.email}<br />
      <strong>Phone:</strong> ${order.customer.phone}<br />
      <strong>Address:</strong> ${order.customer.address}, ${order.customer.city}${order.customer.postalCode ? `, ${order.customer.postalCode}` : ''}
      ${order.customer.notes ? `<br /><strong>Notes:</strong> ${order.customer.notes}` : ''}
    </p>

    <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:17px;border-bottom:2px solid #C0CCB8;padding-bottom:6px;margin-top:28px;">Order #${order.orderId}</h2>
    <table style="width:100%;border-collapse:collapse;margin-top:10px;">
      <thead>
        <tr>
          <th style="${TH}">Product</th>
          <th style="${TH}">Variant/Size</th>
          <th style="${TH}text-align:right;">Quantity</th>
          <th style="${TH}text-align:right;">Price</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>

    <table style="width:100%;font-size:14px;margin-top:14px;">
      <tr><td style="padding:4px 0;color:#5c6b60;">Payment Method</td><td align="right">${order.payment === 'online' ? 'Online Payment' : 'Cash on Delivery'}</td></tr>
      <tr><td style="padding:4px 0;color:#5c6b60;">Subtotal</td><td align="right">${formatPKR(order.subtotal)}</td></tr>
      <tr><td style="padding:4px 0;color:#5c6b60;">Delivery Charges</td><td align="right">${formatPKR(order.deliveryFee)}</td></tr>
      <tr><td style="padding:10px 0;font-weight:bold;border-top:1px solid #C0CCB8;">Total</td><td align="right" style="font-weight:bold;font-size:16px;border-top:1px solid #C0CCB8;">${formatPKR(order.total)}</td></tr>
    </table>

    <p style="margin-top:20px;">
      <strong>Order Date:</strong> ${placedAt}<br />
      <strong>Order Status:</strong> ${order.status}<br />
      <strong>Delivery Zone:</strong> ${order.deliveryZone === 'home' ? 'Lahore (Same Day)' : 'Other City (Courier)'}<br />
      <strong>ETA:</strong> ${order.etaLabel}
    </p>
    ${order.customCakeNote ? `<p><strong>Custom Cake Note:</strong> ${order.customCakeNote}</p>` : ''}
  `)
}

function contactNotificationHtml(message) {
  return wrapEmail(`
    <p>A new contact message has been submitted on the bakery website.</p>

    <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:17px;border-bottom:2px solid #C0CCB8;padding-bottom:6px;">Customer Details</h2>
    <p style="margin-left:8px;">
      <strong>Name:</strong> ${escapeHtml(message.name)}<br />
      <strong>Email:</strong> ${escapeHtml(message.email)}
      ${message.phone ? `<br /><strong>Phone:</strong> ${escapeHtml(message.phone)}` : ''}
    </p>

    <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:17px;border-bottom:2px solid #C0CCB8;padding-bottom:6px;margin-top:28px;">Message</h2>
    <p style="background-color:#F6F0E3;border-left:4px solid #A8B5A0;padding:10px 14px;white-space:pre-wrap;">${escapeHtml(message.message)}</p>

    <p style="margin-top:20px;"><strong>Submitted:</strong> ${formatTimestamp(message.createdAt)}</p>
  `)
}

function newsletterNotificationHtml(subscriber) {
  return wrapEmail(`
    <p>A new visitor has subscribed to the newsletter.</p>
    <p style="margin-left:8px;">
      <strong>Email:</strong> ${escapeHtml(subscriber.email)}<br />
      <strong>Subscribed:</strong> ${formatTimestamp(subscriber.createdAt)}
    </p>
  `)
}

async function sendMail(to, subject, html) {
  const transport = getTransporter()
  if (!transport) {
    console.warn(
      `[email] SMTP not configured (SMTP_HOST/SMTP_USER/SMTP_PASSWORD missing). Skipped sending "${subject}" to ${to}.`,
    )
    return false
  }

  await transport.sendMail({ from: FROM_EMAIL, to, subject, html })
  return true
}

export async function sendOrderEmails(order) {
  const result = { customerSent: false, ownerSent: false }

  try {
    result.customerSent = await sendMail(
      order.customer.email,
      `Thank You for Your Order – ${BAKERY_NAME}`,
      customerEmailHtml(order),
    )
  } catch (error) {
    console.error(`[email] Failed to send customer confirmation for order #${order.orderId}:`, error)
  }

  if (!OWNER_EMAIL) {
    console.warn('[email] OWNER_EMAIL not configured. Skipped owner notification.')
  } else {
    try {
      result.ownerSent = await sendMail(
        OWNER_EMAIL,
        `New Order Received – #${order.orderId}`,
        ownerEmailHtml(order),
      )
    } catch (error) {
      console.error(`[email] Failed to send owner notification for order #${order.orderId}:`, error)
    }
  }

  return result
}

export async function sendContactNotification(message) {
  const result = { ownerSent: false }

  if (!OWNER_EMAIL) {
    console.warn('[email] OWNER_EMAIL not configured. Skipped contact message notification.')
    return result
  }

  try {
    result.ownerSent = await sendMail(
      OWNER_EMAIL,
      `New Contact Message – ${BAKERY_NAME}`,
      contactNotificationHtml(message),
    )
  } catch (error) {
    console.error('[email] Failed to send owner notification for a contact message:', error)
  }

  return result
}

export async function sendNewsletterNotification(subscriber) {
  const result = { ownerSent: false }

  if (!OWNER_EMAIL) {
    console.warn('[email] OWNER_EMAIL not configured. Skipped newsletter notification.')
    return result
  }

  try {
    result.ownerSent = await sendMail(
      OWNER_EMAIL,
      `New Newsletter Subscriber – ${BAKERY_NAME}`,
      newsletterNotificationHtml(subscriber),
    )
  } catch (error) {
    console.error(
      `[email] Failed to send owner notification for newsletter subscription ${subscriber.email}:`,
      error,
    )
  }

  return result
}

export function warnIfEmailNotConfigured() {
  const { SMTP_HOST, SMTP_USER, SMTP_PASSWORD } = process.env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD) {
    console.warn(
      '[email] Order emails are DISABLED because SMTP_HOST / SMTP_USER / SMTP_PASSWORD are not set in backend/.env. Restart the server after updating.',
    )
  }
  if (!OWNER_EMAIL) {
    console.warn('[email] OWNER_EMAIL is not set — the bakery owner will not receive order notifications.')
  }
}
