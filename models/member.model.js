const db = require('../models')

module.exports = (sequelize, Sequelize) => {
    const Member = sequelize.define('member', {
        userId: {
            type: Sequelize.INTEGER,
            references: {
                model: db.user,
                key: 'id'
            }
        },
        roomId: {
            type: Sequelize.INTEGER,
            references: {
                model: db.room,
                key: 'id'
            }
        }
    })
    return Member
}