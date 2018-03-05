// 中间件 例如阻止用户未认证访问某些路由
const user = require('../models/user')
const jwt = require('jsonwebtoken')

const notNeedFilterMap = [
  '/user/login'
]

module.exports = (req, res, next) => {
  if (notNeedFilterMap.includes(req.path)) {
    next()
    return
  }
  if (!req.headers.authorization) {
    res.json({
      code: -1,
      msg: '登录信息错误'
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
    user.getToken(decoded.username)
      .then(userToken => {
        if (!userToken) {
          res.json({
            code: -1,
            msg: '登录信息错误'
          })
        }
        if (userToken === token) {
          next()
        }
      })
      .catch(err => {
        console.log(err)
      })
  })
}
