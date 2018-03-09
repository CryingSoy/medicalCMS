// 中间件 例如阻止用户未认证访问某些路由
const user = require('../models/user')
const auth = require('../models/auth')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  (async function() {
    const authMap = await auth.getAuthTable()
    const [adminMap, doctorMap, noNeedFilterMap] = authMap.map(e => {
      return JSON.parse(e.authArr)
    })
    adminMap.push('/auth/getAuthTable')
    noNeedFilterMap.push('/auth/setAuthTable')
    const _authMap = {
      '超级管理员': adminMap,
      '校医': doctorMap
    }
    req.path = req.path.replace('/admin', '')
    if (noNeedFilterMap.includes(req.path)) {
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
      (async function() {
        const userToken = await user.getToken(decoded.username)
        if (!userToken) {
          res.json({
            code: -2,
            msg: 'token信息错误'
          })
        }
        if (userToken === token) {
          const data = await user.getUserInfo(decoded.username)
          if (data === '') {
            res.json({
              code: -1,
              msg: 'token查询失败'
            })
          } else {
            if (_authMap[data.level].includes(req.path)) {
              next()
            } else {
              res.json({
                code: -3,
                msg: '权限不足'
              })
            }
          }
        } else {
          res.json({
            code: -2,
            msg: 'token信息错误'
          })
        }
      })()
    })
  })()
}
