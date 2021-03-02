const db = require('../models')
const User = db.user
const bcrypt = require('bcryptjs')

exports.findAll = async () => {
    const users = await User.findAll({
        include: ['rooms']
    })
    return users
}

exports.createUser = async (user) => {
    try {
        user.password = await bcrypt.hash(user.password, 10)
        const newUser = await User.create({
            email: user.email,
            password: user.password,
            username: user.username
        })
        console.log('Created User: ', JSON.stringify(newUser, null, 4))
        return newUser
    } catch (err) {
        console.log('Error while creating User: ', err)
    }
}
