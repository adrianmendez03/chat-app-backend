const db = require('../models')
const { Room, User, Message } = db

exports.findAll = async () => {
    try {
        const rooms = await Room.findAll({ include: User })
        return rooms
    } catch(err) {
        console.log('Error while finding Rooms: ', err)
    }
}

exports.createRoom = async (body, userId) => {
    try {
        const room = await Room.create({
            name: body.name
        })
        const user = await User.findByPk(userId)
        await room.addUser(user, { through: { admin: true } })
        const result = await Room.findByPk(
            room.id,
            { include: User }
        )
        return result
    } catch (err) {
        return err
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

exports.updateRoom = async (id, body) => {
    try {
        const room = await Room.findByPk(id)
        room.update(body)
        return room
    } catch(err) {
        return err
    }
}

exports.deleteRoom = async (id) => {
    try {
        const room = await Room.findByPk(id)
        room.destroy()
        return { message: 'Room deleted.'}
    } catch(err) {
        return err
    }
}

exports.addMember = async (roomId, userId) => {
    try {
        const room = await Room.findByPk(roomId)
        const user = await User.findByPk(userId)
        await room.addUser(user)
        const result = await Room.findByPk(
            roomId,
            { include: User }
        )
        return result
    } catch(err) {
        return err
    }
}

exports.removeMember = async (roomId, userId) => {
    try {
        const room = await Room.findByPk(roomId)
        const user = await User.findByPk(userId)
        await room.removeUser(user)
        const result = await Room.findByPk(
            roomId,
            { include: User }
        )
        return result
    } catch(err) {
        return err
    }
}

exports.addMessage = async (roomId, body) => {
    try {
        const room = await Room.findByPk(roomId)
        const message = await Message.create({
            content: body.content
        })
        await room.addMessage(message)
        const result = await Room.findByPk(
            roomId,
            { include: Message }
        )
        return result
    } catch(err) {
        return err
    }
}