const { Router } = require('express')
const router = Router()
const controller = require('../controllers/room.controller')

router.get('/', async (req, res) => {
    const room = await controller.findAll()
    res.json(room)
})

router.post('/', async (req, res) => {
    const newRoom = await controller.createRoom(req.body)
    res.json(newRoom)
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    const room = await controller.findById(id)
    res.json(room)
})

router.post('/:roomId/add/:userId', async (req, res) => {
    const { roomId, userId } = req.params
    res.json(await controller.addMember(roomId, userId))
})

module.exports = router