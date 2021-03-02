const { Router } = require('express')
const router = Router()
const controller = require('../controllers/user.controller')

// INDEX
router.get('/', async (req, res) => {
    const users = await controller.findAll()
    res.json(users)
})

// CREATE
router.post('/', async (req, res) => {
    const newUser = await controller.createUser(req.body)
    res.json(newUser)
})

// GET BY ID
router.get('/:id', async (req, res) => {
    const { id } = req.params
    const user = await controller.findById(id)
    res.json(user)
})

// UPDATE
router.put('/:id', async (req, res) => {
    const { id } = req.params
    const user = await controller.updateUser(id, req.body)
    res.json(user)
})


module.exports = router