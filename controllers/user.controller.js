const db = require('../models')
const { User, Room } = db
const bcrypt = require('bcryptjs')

exports.findAll = async () => {
    try {
        const users = await User.findAll({ 
            include: [{ model: User, as: 'requests' }] 
        })
        return users
    } catch(err) {
        return err
    }
}

exports.createUser = async (user) => {
    try {
        user.password = await bcrypt.hash(user.password, 10)
        const newUser = await User.create({
            email: user.email,
            password: user.password,
            username: user.username
        })
        return newUser
    } catch (err) {
        return err
    }
}

exports.findById = async (id) => {
    try {
        const user = await User.findByPk(
            id,
            { include: [Room, { model: User, as: 'requests' }] }
        )
        return user
    } catch(err) {
        return err
    }
}

exports.updateUser = async (id, body) => {
    try {
        const user = await User.findByPk(id)
        user.update(body)
        return user
    } catch(err) {
        return err
    }
}

exports.deleteUser = async (id) => {
    try {
        const user = await User.findByPk(id)
        user.destroy()
        return { message: 'User deleted.'}
    } catch(err) {
        return err
    }
}

exports.createRequest = async (requesteeId, requesterId) => {
    try {
        const requestee = await User.findByPk(requesteeId)
        const requester = await User.findByPk(requesterId)
        await requester.addRequest(requestee, { through: { response: 'received' }})
        await requestee.addRequest(requester, { through: { response: 'sent' }})
        return { message: 'Request sent.' }
    } catch(err) {
        return err
    }
}