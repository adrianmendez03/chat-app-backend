const db = require('../models')
const { Room, User } = db

exports.findAll = async () => {
    try {
        const rooms = await Room.findAll({})
        return rooms
    } catch(err) {
        console.log('Error while finding Rooms: ', err)
    }
}

exports.createRoom = async (room) => {
    try {
        const newRoom = await Room.create({
            name: room.name
        })
        console.log('Created Room: ', JSON.stringify(newRoom, null, 4))
        return newRoom
    } catch (err) {
        console.log('Error while creating User: ', err)
    }
}

exports.findById = async (id) => {
    try {
        const room = await Room.findByPk(
            id,
            { include: User }
        )
        return room
    } catch(err) {
        console.log('Error while finding User: ', err)
    }
}

exports.addMember = async (roomId, userId) => {
    try {
        const room = await Room.findByPk(roomId)
        const user = await User.findByPk(userId)
        // await user.addRoom(room)
        await room.addUser(user)
        const result = await Room.findOne({
            where: { id: roomId },
            include: User
        })
        return result
    } catch(err) {
        return err
    }
}