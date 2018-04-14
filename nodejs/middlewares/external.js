const model = require('../models/external')
const jwt = require('jsonwebtoken')
const noNeedFilterMap = [
  '/login',
  '/getUserInfo'
]
const _authMap = {
  teacher: [
    '/resetPassword',
    '/getStudentInfoByParams',
    '/getTreatInfoByParams'
  ],
  student: [
    '/resetPassword',
    '/getStudentInfoByParams',
    '/getTreatInfoByParams',
    '/changeStudentInfo'
  ]
}
module.exports = (req, res, next) => {
  req.path = req.path.replace('/external', '')
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
      const userToken = await model.getToken(decoded.username)
      if (!userToken) {
        res.json({
          code: -2,
          msg: 'token信息错误'
        })
      }
      if (userToken === token) {
        const data = await model.getUserInfo(decoded.username)
        if (data === '') {
          res.json({
            code: -1,
            msg: 'token查询失败'
          })
        } else {
          if (_authMap[data.type].includes(req.path)) {
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
}
