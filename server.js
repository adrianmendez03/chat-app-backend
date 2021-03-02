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

//WORKS

// const run = async () => {
//     const user = await User.create({ email: "adrianmndz328@gmail.com", password: "10222016", username: "adrianmendez03" })
//     const room = await Room.create({ name: "Test Room" })
//     await user.addRoom(room)
//     const result = await User.findOne({
//         where: { username: "adrianmendez03" },
//         include: Room
//     });
//     console.log(result.toJSON())
// }

//

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

// {
//     "id": 1,
//     "name": "test",
//     "updatedAt": "2021-03-02T19:23:18.700Z",
//     "createdAt": "2021-03-02T19:23:18.700Z"
// }

// {
//     "id": 1,
//     "email": "adrianmndz328@gmail.com",
//     "password": "$2a$10$50cOBfoQNtNqvC.VInofFuMtjJYhtQachG8xkwLVY61iumZjZ6jRG",
//     "username": "usernmae",
//     "updatedAt": "2021-03-02T19:24:41.439Z",
//     "createdAt": "2021-03-02T19:24:41.439Z"
// }