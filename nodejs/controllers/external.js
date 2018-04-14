const express = require('express')
const router = express.Router()
const utils = require('../utils')
const jwt = require('jsonwebtoken')
const model = require('../models/external')
const smodel = require('../models/student')
const tmodel = require('../models/treat')

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
  (async function() {
    try {
      if (await model.queryUsername(data.username)) {
        res.json({
          code: -1,
          msg: '用户名不存在'
        })
        return
      }

      const pwd = await model.getPassword(data.username)
      if (!pwd) {
        res.json({
          code: -1,
          msg: '登录失败'
        })
        return
      }

      if (utils.changeWithMD5(data.password) === pwd) {
        data.password = ''
        const token = jwt.sign(data, 'sise', {
          // 一天
          expiresIn: 60 * 60 * 24
        })
        await model.updateToken(data.username, token)
        res.json({
          code: 1,
          msg: '登录成功',
          token
        })
      } else {
        res.json({
          code: -1,
          msg: '用户名或密码错误'
        })
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

router.post('/getUserInfo', (req, res) => {
  if (!req.headers.authorization) {
    res.json({
      code: -1,
      msg: 'token不存在'
    })
    return
  }
  const token = req.headers.authorization
  try {
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
        const userToken = await model.getToken(decoded.username)
        if (!userToken) {
          res.json({
            code: -1,
            msg: '登录信息错误'
          })
          return
        }
        if (userToken === token) {
          const userData = await model.getUserInfo(decoded.username)
          if (userData === '') {
            res.json({
              code: -1,
              msg: '查询失败'
            })
          } else {
            res.json({
              code: 1,
              msg: '验证成功',
              data: userData
            })
          }
        } else {
          res.json({
            code: -1,
            msg: '登录信息错误'
          })
          return
        }
      })()
    })
  } catch (error) {
    console.log(error)
    res.json({
      code: -1,
      msg: '服务器错误'
    })
  }
})

router.post('/resetPassword', (req, res) => {
  const data = req.body
  if (!data.username) {
    res.json({
      code: -1,
      msg: '用户名为空'
    })
    return
  }
  if (!data.password) {
    res.json({
      code: -1,
      msg: '密码为空'
    })
    return
  }
  if (data.password.length < 6 || data.password.length > 16) {
    res.json({
      code: -1,
      msg: '密码长度必须是6到16'
    })
    return
  }
  (async function() {
    try {
      if (await model.queryUsername(data.username)) {
        res.json({
          code: -1,
          msg: '用户名不存在'
        })
        return
      }
      data.password = utils.changeWithMD5(data.password)
      await model.resetPassword(data)
      res.json({
        code: 1,
        msg: `${data.username}密码修改成功`
      })
    } catch (error) {
      console.log(error)
      res.json({
        code: -1,
        msg: '服务器错误'
      })
    }
  })()
})

router.post('/getStudentInfoByParams', (req, res) => {
  const data = req.body
  !(async function() {
    try {
      console.log(data.params)
      const result = await smodel.getStudentInfoByParams(JSON.parse(data.params), data)
      const total = await smodel.getStudentInfoByParamsTotal(JSON.parse(data.params), data)
      res.json({
        code: 1,
        msg: `查询成功，共查到${result.length}条数据`,
        data: result,
        total
      })
    } catch (error) {
      console.log(error)
      res.json({
        code: -1,
        msg: '服务器错误或者参数错误'
      })
    }
  })()
})

router.post('/saveStudentInfo', (req, res) => {
  const data = req.body
  console.log(req)
  if (!data.name) {
    res.json({
      code: -1,
      msg: '名字不能为空'
    })
    return
  }
  if (!data.age) {
    res.json({
      code: -1,
      msg: '年龄不能为空'
    })
    return
  }
  if (!data.sex) {
    res.json({
      code: -1,
      msg: '性别不能为空'
    })
    return
  }
  if (!data.cardId) {
    res.json({
      code: -1,
      msg: 'cardId不能为空'
    })
    return
  }
  if (!data.stuId) {
    res.json({
      code: -1,
      msg: 'stuId不能为空'
    })
    return
  }
  (async function() {
    try {
      const cardIdResult = await smodel.querycardId(data.cardId)
      if (cardIdResult.isExist) {
        res.json({
          code: -1,
          msg: '该cardId已经存在，不能再录入'
        })
        return
      }
      await smodel.saveStudentInfo(data)
      res.json({
        code: 1,
        msg: '录入成功'
      })
    } catch (error) {
      console.log(error)
      res.json({
        code: -1,
        msg: '参数错误或者服务器错误'
      })
    }
  })()
})

router.post('/changeStudentInfo', (req, res) => {
  const data = req.body
  if (!data.name) {
    res.json({
      code: -1,
      msg: '名字不能为空'
    })
    return
  }
  if (!data.age) {
    res.json({
      code: -1,
      msg: '年龄不能为空'
    })
    return
  }
  if (!data.sex) {
    res.json({
      code: -1,
      msg: '性别不能为空'
    })
    return
  }
  if (!data.cardId) {
    res.json({
      code: -1,
      msg: 'cardId不能为空'
    })
    return
  }
  if (!data.stuId) {
    res.json({
      code: -1,
      msg: 'stuId不能为空'
    })
    return
  }
  (async function() {
    try {
      const cardIdResult = await smodel.querycardId(data.cardId)
      if (!cardIdResult.isExist) {
        res.json({
          code: -1,
          msg: '该cardId不存在'
        })
        return
      }
      await smodel.changeStudentInfo(data)
      res.json({
        code: 1,
        msg: `更改cardId为${data.cardId}信息成功`
      })
    } catch (error) {
      console.log(error)
      res.json({
        code: -1,
        msg: '参数错误或者服务器错误'
      })
    }
  })()
})

router.post('/getTreatInfoByParams', (req, res) => {
  const data = req.body
  if (!data.params) {
    (async function() {
      try {
        const result = await tmodel.getTreatInfoAll(data)
        const total = await tmodel.getTreatInfoAllTotal(data)
        res.json({
          code: 1,
          msg: `查询成功，共查到${result.length}条数据`,
          data: result,
          total
        })
      } catch (error) {
        console.log(error)
        res.json({
          code: -1,
          msg: '服务器错误'
        })
      }
    })()
  } else {
    (async function() {
      try {
        const result = await tmodel.getTreatInfoByParams(JSON.parse(data.params), data)
        const total = await tmodel.getTreatInfoByParamsTotal(JSON.parse(data.params), data)
        res.json({
          code: 1,
          msg: `查询成功，共查到${result.length}条数据`,
          data: result,
          total
        })
      } catch (error) {
        console.log(error)
        res.json({
          code: -1,
          msg: '服务器错误'
        })
      }
    })()
  }
})

module.exports = router
