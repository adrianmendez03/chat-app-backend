const dbConfig = require('../config/config')

const Sequelize = require('sequelize')
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.User = require('./user.model')(sequelize, Sequelize)
db.Room = require('./room.model')(sequelize, Sequelize)
db.Message = require('./message.model')(sequelize, Sequelize)

const { User, Room, Message } = db

const User_Rooms = sequelize.define('User_Rooms', {
    admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
})

const User_Requests = sequelize.define('User_Requests', {
    response: {
        type: Sequelize.STRING
    }
})

const Room_Messages = sequelize.define('Room_Messages', {
    sender: {
        type: Sequelize.STRING,
        require: true
    }
})

User.belongsToMany(Room, { through: 'User_Rooms' })
Room.belongsToMany(User, { through: 'User_Rooms' })
User.belongsToMany(User, { as: 'requests', through: 'User_Requests' })
User.belongsToMany(User, { as: 'friends', through: 'User_Friends' })
Room.hasMany(Message)
Message.belongsTo(Room)

// db.user.belongsToMany(db.user, {
//     through: 'UserFriends',
//     as: 'users',
//     foreignKey: 'user_id'
// })

// db.user.belongsToMany(db.user, {
//     through: 'friend',
//     as: 'users',
//     foreignKey: 'user_id'
// })

// db.user.belongsToMany(db.user, { through: db.friend, as: 'friends' })
// db.user.belongsToMany(db.user, { through: db.request, as: 'requests' })
// db.user.hasMany(db.message)
// db.message.belongsTo(db.user)
// db.user.belongsToMany(db.room, { through: db.member, as: 'members' })
// db.room.belongsToMany(db.user, { through: db.member, as: 'rooms' })
// db.room.hasMany(db.message)
// db.message.belongsTo(db.room)

module.exports = db