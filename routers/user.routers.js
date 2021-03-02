const { Router } = require('express')
const router = Router()
const controller = require('../controllers/user.controller')

router.get('/', async (req, res) => {
    const users = await controller.findAll()
    res.json(users)
})

module.exports = router