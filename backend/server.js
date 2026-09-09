import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import deliveryRoutes from './routes/deliveryRoutes.js'
import contactRoutes from './routes/contactRoutes.js'
import newsletterRoutes from './routes/newsletterRoutes.js'
import { connectDB } from './config/db.js'
import { notFound, errorHandler } from './middleware/errorHandler.js'
import { warnIfEmailNotConfigured } from './services/emailService.js'

const app = express()
const PORT = process.env.PORT || 5000

const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((origin) => origin.trim())
  : true

app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: false,
  }),
)
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/delivery', deliveryRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/newsletter', newsletterRoutes)

app.use(notFound)
app.use(errorHandler)

connectDB().then(() => {
  warnIfEmailNotConfigured()
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })
})
