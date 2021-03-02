const db = require('../models')
const { User, Room } = db
const bcrypt = require('bcryptjs')

exports.findAll = async () => {
    try {
        const users = await User.findAll({})
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
            { include: Room }
        )
        return user
    } catch(err) {
        return err
    }
}

exports.updateUser = async (id, body) => {
    console.log(body)
    try {
        const user = await User.findByPk(id)
        user.update(body)
        return user
    } catch(err) {
        return err
    }
}