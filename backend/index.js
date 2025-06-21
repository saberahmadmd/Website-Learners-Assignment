const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const authRoutes = require('./routes/auth')
const medicationRoutes = require('./routes/medications')

dotenv.config()

const app = express()

app.use(cors({
  origin: [process.env.CLIENT_URL, 'http://localhost:3000'],
  credentials: true,
}));

app.use(express.json())

app.use('/api', authRoutes)
app.use('/api', medicationRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`)
})
