const express = require('express')
const router = express.Router()

router.use('/user', require('./user'))

router.use('/auth', require('./auth'))

router.get('/', (req, res) => {
  res.end('index')
})

module.exports = router
