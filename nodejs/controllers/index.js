const express = require('express')
const router = express.Router()

router.use('/user', require('./user'))

router.use('/auth', require('./auth'))

router.use('/drug', require('./drug'))

router.use('/others', require('./others'))

router.use('/student', require('./student'))

router.get('/', (req, res) => {
  res.end('index')
})

module.exports = router
