const express = require('express')
const router = express.Router()
const user = require('../models/user')
const utils = require('../utils')
const jwt = require('jsonwebtoken')

router.post('/login', (req, res) => {
  const data = req.body
  if (!data.username) {
    res.json({
      code: -1,
      msg: '用户名不能为空'
    })
    return
  }
  if (!data.password) {
    res.json({
      code: -1,
      msg: '密码不能为空'
    })
    return
  }
  user.queryUsername(data.username)
    .then(flag => {
      if (!flag) {
        return user.getPassword(data.username)
      } else {
        res.json({
          code: -1,
          msg: '用户名不存在'
        })
      }
    })
    .then(password => {
      if (!password) {
        res.json({
          code: -1,
          msg: '登录失败'
        })
      }
      if (utils.changeWithMD5(data.password) === password) {
        data.password = ''
        const token = jwt.sign(data, 'sise', {
          // 一天
          expiresIn: 60 * 60 * 24
        })
        return user.updateToken(data.username, token)
      } else {
        res.json({
          code: -1,
          msg: '用户名或密码错误'
        })
      }
    })
    .then(token => {
      res.json({
        code: 1,
        msg: '登录成功',
        token
      })
    })
    .catch(err => {
      console.log(err)
    })
})

module.exports = router
