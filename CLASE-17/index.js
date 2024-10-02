import express from 'express'
import productsRouter from './routes/products.route.js'

const app = express()
const PORT = 8000

app.use(express.json())

app.use('/api/products', productsRouter)

app.listen(PORT, () => {
    console.log(`El servidor se esta ejecutando en http://localhost:${PORT}`)
})