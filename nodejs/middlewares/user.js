// 中间件 例如阻止用户未认证访问某些路由
const user = require('../models/user')
const jwt = require('jsonwebtoken')

const notNeedFilterMap = [
  '/user/login',
  '/user/getUserInfo'
]

const authMap = {
  '超级管理员': [
    '/user/addAdminOrDoctor',
    '/user/removeUser',
    '/user/getUserByType',
    '/user/resetPassword'
  ],
  '校医': []
}

module.exports = (req, res, next) => {
  console.log(req)
  if (notNeedFilterMap.includes(req.path)) {
    next()
    return
  }
  if (!req.headers.authorization) {
    res.json({
      code: -2,
      msg: 'token不存在'
    })
    return
  }
  const token = req.headers.authorization
  jwt.verify(token, 'sise', (err, decoded) => {
    if (err) {
      console.log(err)
      res.json({
        code: -2,
        msg: 'token已过期'
      })
      return
    }
    user.getToken(decoded.username)
      .then(userToken => {
        if (!userToken) {
          res.json({
            code: -2,
            msg: 'token信息错误'
          })
        }
        if (userToken === token) {
          return user.getUserInfo(decoded.username)
        } else {
          res.json({
            code: -2,
            msg: 'token信息错误'
          })
        }
      })
      .then(data => {
        if (data === '') {
          res.json({
            code: -1,
            msg: 'token查询失败'
          })
        } else {
          console.log(data)
          if (authMap[data.level].includes(req.path)) {
            next()
          } else {
            res.json({
              code: -3,
              msg: '权限不足'
            })
          }
        }
      })
      .catch(err => {
        console.log(err)
      })
  })
}
