const db = require('../models')

module.exports = (sequelize, Sequelize) => {
    const Friend = sequelize.define('friend', {
        userId: {
            type: Sequelize.INTEGER,
            references: {
                model: db.user,
                key: 'id'
            }
        },
        friendId: {
            type: Sequelize.INTEGER,
            references: {
                model: db.user,
                key: 'id'
            }
        }
    })
    return Friend
}