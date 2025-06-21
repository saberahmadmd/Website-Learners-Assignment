const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const authRoutes = require('./routes/auth')
const medicationRoutes = require('./routes/medications')

dotenv.config()

const app = express()
const allowedOrigins = [
  'http://localhost:3000',
  'https://website-learners-assignment-delta.vercel.app/',
  'https://website-learners-assignment-git-main-md-saber-ahmads-projects.vercel.app/',
  'https://website-learners-assignment-md-saber-ahmads-projects.vercel.app/',
  'https://vercel.com/md-saber-ahmads-projects/website-learners-assignment/AdNYivT5AqzthMFhnGLpUowz4VQ6'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json())

app.use('/api', authRoutes)
app.use('/api', medicationRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`)
})
