const { Router } = require('express')
const router = Router()
const controller = require('../controllers/user.controller')

// CREATE FRIEND REQUEST 
router.post('/:requesteeId/request/:requesterId', async (req, res) => {
    const { requesteeId, requesterId } = req.params
    console.log(requesteeId, requesterId)
    res.json(await controller.createRequest(requesteeId, requesterId))
})

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

module.exports = router