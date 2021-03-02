require('dotenv').config()
const express = require('express')
const cors = require('cors')
const PORT = process.env.PORT || 4500

const app = express()
app.use(cors())
app.use(express.json())

const userRouter = require('./routers/user.routers')

app.get('/', (req, res) => {
    res.json({ message: 'Default route... nothing to see here..'})
})

app.use('/users', userRouter)

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})