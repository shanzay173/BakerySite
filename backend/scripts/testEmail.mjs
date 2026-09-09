import 'dotenv/config'
import nodemailer from 'nodemailer'

const mask = (value) => (value ? `${value.slice(0, 3)}***${value.slice(-3)}` : '(not set)')

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, FROM_EMAIL, OWNER_EMAIL } = process.env

console.log('--- Email configuration ---')
console.log(`SMTP_HOST=${SMTP_HOST || '(not set)'}`)
console.log(`SMTP_PORT=${SMTP_PORT || '(not set)'}`)
console.log(`SMTP_USER=${mask(SMTP_USER)}`)
console.log(`SMTP_PASSWORD=${mask(SMTP_PASSWORD)}`)
console.log(`FROM_EMAIL=${FROM_EMAIL || '(not set)'}`)
console.log(`OWNER_EMAIL=${OWNER_EMAIL || '(not set)'}`)

if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD) {
  console.error('\n✗ SMTP is not configured. Fill SMTP_HOST / SMTP_USER / SMTP_PASSWORD in backend/.env and restart the server.')
  process.exit(1)
}

const port = Number(SMTP_PORT) || 587
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port,
  secure: port === 465,
  auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
})

try {
  console.log('\nVerifying SMTP connection...')
  await transporter.verify()
  console.log('✓ SMTP connection and authentication successful.')
} catch (error) {
  console.error('\n✗ SMTP verification failed:', error.message)
  if (error.code) console.error('  Code:', error.code)
  if (/Invalid|Username and Password|authentication/i.test(error.message)) {
    console.error('  → For Gmail you must use a 16-character App Password (not your normal password).')
    console.error('    Enable 2-Step Verification, then create one at: https://myaccount.google.com/apppasswords')
  }
  process.exit(1)
}

const to = process.argv[2] || OWNER_EMAIL || SMTP_USER
if (!to) {
  console.error('\n✗ No recipient given. Usage: node scripts/testEmail.mjs you@example.com')
  process.exit(1)
}

try {
  const info = await transporter.sendMail({
    from: FROM_EMAIL || SMTP_USER,
    to,
    subject: 'Test Email – Bakery Order System',
    html: '<p>If you received this, order emails are working correctly.</p>',
  })
  console.log(`\n✓ Test email sent to ${to} (message id: ${info.messageId}).`)
  console.log('  Also check the spam/junk folder if you cannot see it in the inbox.')
} catch (error) {
  console.error(`\n✗ Failed to send test email to ${to}:`, error.message)
  if (error.code) console.error('  Code:', error.code)
  process.exit(1)
}
