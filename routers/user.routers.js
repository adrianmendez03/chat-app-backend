const { Router } = require('express')
const router = Router()
const controller = require('../controllers/user.controller')

// INDEX
router.get('/', async (req, res) => {
    res.json(await controller.findAll())
})

// CREATE
router.post('/', async (req, res) => {
    res.json(await controller.createUser(req.body))
})

// GET BY ID
router.get('/:id', async (req, res) => {
    const { id } = req.params
    res.json(await controller.findById(id))
})

// UPDATE
router.put('/:id', async (req, res) => {
    const { id } = req.params
    res.json(await controller.updateUser(id, req.body))
})

// DELETE
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    res.json(await controller.deleteUser(id))
})

// CREATE FRIEND REQUEST 
router.post('/:requesteeId/request/:requesterId', async (req, res) => {
    const { requesteeId, requesterId } = req.params
    res.json(await controller.createRequest(requesteeId, requesterId))
})

// DELETE FRIEND REQUEST
router.delete('/:requesteeId/request/:requesterId', async (req, res) => {
    const { requesteeId, requesterId} = req.params
    res.json(await controller.deleteRequest(requesteeId, requesterId))
})

// ADD FRIEND
router.post('/:userId/friend/:friendId', async (req, res) => {
    const { userId, friendId } = req.params
    res.json(await controller.addFriend(userId, friendId))
})

// REMOVE FRIEND
router.delete('/:userId/friend/:friendId', async (req, res) => {
    const { userId, friendId } = req.params
    res.json(await controller.deleteFriend(userId, friendId))
})

module.exports = router