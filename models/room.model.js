module.exports = (sequelize, Sequelize) => {
    const Room = sequelize.define('room', {
        name: Sequelize.STRING
    })
    return Room
}