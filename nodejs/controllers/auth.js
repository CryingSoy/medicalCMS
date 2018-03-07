const express = require('express')
const user = require('../models/user')
const auth = require('../models/auth')
const router = express.Router()
const jwt = require('jsonwebtoken')

router.get('/getAuthTable', (req, res) => {
  const type = req.query.type
  if (!(type === undefined || type === '超级管理员' || type === '校医' || type === 'notNeedFilter')) {
    res.json({
      code: -1,
      msg: 'type类型错误'
    })
    return
  }
  auth.getAuthTable(type)
    .then(data => {
      if (data) {
        res.json({
          code: 1,
          msg: '查询成功',
          data
        })
      } else {
        res.json({
          code: -1,
          msg: '查询失败'
        })
      }
    })
})

router.post('/setAuthTable', (req, res) => {
  const postData = req.body
  if (!req.headers.authorization) {
    res.json({
      code: -1,
      msg: 'token不存在'
    })
    return
  }
  if (!postData.authArr) {
    res.json({
      code: -1,
      msg: 'authArr为空'
    })
    return
  }
  if (!postData.type) {
    res.json({
      code: -1,
      msg: 'type为空'
    })
    return
  }
  if (!(postData.type === '超级管理员' || postData.type === '校医' || postData.type === 'notNeedFilter')) {
    res.json({
      code: -1,
      msg: 'type类型错误'
    })
    return
  }
  if (!postData.authArr.includes('[') || !postData.authArr.includes(']')) {
    res.json({
      code: -1,
      msg: 'authArr是一个字符串数组'
    })
    return
  }
  const token = req.headers.authorization
  jwt.verify(token, 'sise', (err, decoded) => {
    if (err) {
      console.log(err)
      res.json({
        code: -1,
        msg: '登录信息错误'
      })
      return
    }
    (async function() {
      try {
        const userToken = await user.getToken(decoded.username)
        if (!userToken) {
          res.json({
            code: -1,
            msg: '登录信息错误'
          })
        }
        if (userToken === token) {
          const data = await user.getUserInfo(decoded.username)
          if (data.level === '超级管理员') {
            await auth.updateAuthTable(postData)
            res.json({
              code: 1,
              msg: '更改成功'
            })
          }
        }
      } catch (error) {
        console.log(error)
        res.json({
          code: -1,
          msg: '服务器错误'
        })
      }
    })()
  })
})

module.exports = router
