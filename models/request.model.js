const db = require('../models')

module.exports = (sequelize, Sequelize) => {
    const Request = sequelize.define('request', {
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
    return Request
}