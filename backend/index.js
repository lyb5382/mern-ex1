const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI).then(() => console.log('connect mongo')).catch((err) => console.log('failed', err))

const postRoutes = require('./routes/postRoutes')
app.use('/api/posts', postRoutes)

app.get('/', (req, res) => {
    res.send('hello express')
})
app.listen(PORT, () => {
    console.log(`server running → http://localhost:${PORT}`)
})