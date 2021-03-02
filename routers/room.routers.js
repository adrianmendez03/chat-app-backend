const { Router } = require('express')
const router = Router()
const controller = require('../controllers/room.controller')

// INDEX
router.get('/', async (req, res) => {
    res.json(await controller.findAll())
})

// CREATE
router.post('/:userId', async (req, res) => {
    const { userId } = req.params
    console.log(userId)
    res.json(await controller.createRoom(req.body, userId))
})

// GET ONE ROOM
router.get('/:id', async (req, res) => {
    const { id } = req.params
    res.json(await controller.findById(id))
})

// UPDATE 
router.put('/:id', async (req, res) => {
    const { id } = req.params
    res.json(await controller.updateRoom(id, req.body))
})

// DELETE 
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    res.json(await controller.deleteRoom(id))
})

// ADD MEMBER TO ROOM
router.post('/:roomId/add/:userId', async (req, res) => {
    const { roomId, userId } = req.params
    res.json(await controller.addMember(roomId, userId))
})

// REMOVE MEMBER FROM ROOM
router.delete('/:roomId/remove/:userId', async (req, res) => {
    const { roomId, userId } = req.params
    res.json(await controller.removeMember(roomId, userId))
})

module.exports = router