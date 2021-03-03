require('dotenv').config()
const express = require('express')
const cors = require('cors')
const PORT = process.env.PORT || 4500
const db = require('./models')

const app = express()
app.use(cors())
app.use(express.json())

const userRouter = require('./routers/user.routers')
const roomRouter = require('./routers/room.routers')

const { User, Room } = db

const run = async () => {
    await User.create({ email: "adrianmndz328@gmail.com", password: "10222016", username: "adrianmendez03" })
    await User.create({ email: "xvictimized@gmail.com", password: "102020112", username: "xvictmized" })
    await Room.create({ name: "Test Room" })
}

db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
    run()
});

app.get('/', (req, res) => {
    res.json({ message: 'Default route... nothing to see here..'})
})

app.use('/users', userRouter)
app.use('/rooms', roomRouter)

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})
