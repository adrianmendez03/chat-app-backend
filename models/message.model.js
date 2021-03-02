module.exports = (sequelize, Sequelize) => {
    const Message = sequelize.define('message', {
        content: Sequelize.STRING
    })
    return Message
}