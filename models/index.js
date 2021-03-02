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

db.user = require('./user.model')(sequelize, Sequelize)
db.room = require('./room.model')(sequelize, Sequelize)
db.message = require('./message.model')(sequelize, Sequelize)
db.friend = require('./friend.model')(sequelize, Sequelize)
db.request = require('./request.model')(sequelize, Sequelize)
db.member = require('./member.model')(sequelize, Sequelize)

db.user.belongsToMany(db.user, { through: db.friend, as: 'friends' })
db.user.belongsToMany(db.user, { through: db.request, as: 'requests' })
db.user.hasMany(db.message)
db.message.belongsTo(db.user)
db.user.belongsToMany(db.room, { through: db.member, as: 'members' })
db.room.belongsToMany(db.user, { through: db.member, as: 'rooms' })
db.room.hasMany(db.message)
db.message.belongsTo(db.room)

module.exports = db