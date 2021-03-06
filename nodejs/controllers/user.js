const express = require('express')
const router = express.Router()
const user = require('../models/user')
const utils = require('../utils')
const jwt = require('jsonwebtoken')

// 登录
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

// 验证token
router.post('/getUserInfo', (req, res) => {
  if (!req.headers.authorization) {
    res.json({
      code: -1,
      msg: 'token不存在'
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
          return user.getUserInfo(decoded.username)
        }
      })
      .then(data => {
        if (data === '') {
          res.json({
            code: -1,
            msg: '查询失败'
          })
        } else {
          res.json({
            code: 1,
            msg: '验证成功',
            data
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  })
})

// 增加后台用户
router.post('/addAdminOrDoctor', (req, res) => {
  const data = req.body
  if (!data.username) {
    res.json({
      code: -1,
      msg: 'username不能为空'
    })
    return
  }
  if (!data.password) {
    res.json({
      code: -1,
      msg: 'password不能为空'
    })
    return
  }
  if (data.username.length < 2 || data.username.length > 16) {
    res.json({
      code: -1,
      msg: '用户名长度必须是2到16'
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
  if (!data.type) {
    res.json({
      code: -1,
      msg: 'type不能为空'
    })
    return
  }
  if (!(data.type === 'admin' || data.type === 'doctor')) {
    res.json({
      code: -1,
      msg: 'type类型错误'
    })
    return
  }
  (async function() {
    try {
      const flag = await user.queryUsername(data.username)
      if (flag) {
        data.password = utils.changeWithMD5(data.password)
        await user.addUser(data)
        res.json({
          code: 1,
          msg: '添加成功'
        })
      } else {
        res.json({
          code: -1,
          msg: '用户名已存在'
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

// 删除后台用户
router.post('/removeUser', (req, res) => {
  const data = req.body
  if (!data.username) {
    res.json({
      code: -1,
      msg: 'username不能为空'
    })
    return
  }
  (async function() {
    try {
      const flag = await user.queryUsername(data.username)
      if (!flag) {
        await user.removeUser(data.username)
        res.json({
          code: 1,
          msg: `${data.username}删除成功`
        })
      } else {
        res.json({
          code: -1,
          msg: '用户名不存在'
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

// 获取用户通过类型
router.get('/getUserByType', (req, res) => {
  const data = req.query
  const type = data.type
  if (type === '') {
    res.json({
      code: -1,
      msg: 'type为空'
    })
    return
  }
  if (!(type === 'admin' || type === 'doctor' || type === 'adminDoctor' || type === 'teacher' || type === 'student')) {
    res.json({
      code: -1,
      msg: 'type类型错误'
    })
    return
  }
  user.getUser(type, data)
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
          msg: '查询失败或没有数据'
        })
      }
    })
    .catch(err => {
      console.log(err)
      res.json({
        code: -1,
        msg: '服务器错误'
      })
    })
})

// 后台用户重置密码
router.post('/resetPassword', (req, res) => {
  const data = req.body
  if (!(!data.type || data.type === 'userInfo')) {
    res.json({
      code: -1,
      msg: 'type类型错误'
    })
  }
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
  if (!data.type) {
    (async function() {
      try {
        const flag = await user.queryUsername(data.username)
        if (!flag) {
          data.password = utils.changeWithMD5(data.password)
          await user.resetPassword(data)
          res.json({
            code: 1,
            msg: `${data.username}密码修改成功`
          })
        } else {
          res.json({
            code: -1,
            msg: '用户名不存在'
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
  } else if (data.type === 'userInfo') {
    (async function() {
      try {
        const flag = await user.queryUsernameInUserinfo(data.username)
        if (!flag) {
          data.password = utils.changeWithMD5(utils.changeWithMD5(data.password).substring(0, 10))
          await user.resetPassword(data)
          res.json({
            code: 1,
            msg: `${data.username}密码修改成功`
          })
        } else {
          res.json({
            code: -1,
            msg: '用户名不存在'
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
  }
})

router.get('/getUserListByParams', (req, res) => {
  const data = req.query
  if (!data.params) {
    (async function() {
      try {
        const result = await user.getUserListAll(data)
        const total = await user.getUserListAllTotal(data)
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
        const result = await user.getUserListByParams(JSON.parse(data.params), data)
        const total = await user.getUserListByParamsTotal(JSON.parse(data.params), data)
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

router.post('/resetPasswords', (req, res) => {
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
      if (await user.queryUsernameE(data.username)) {
        res.json({
          code: -1,
          msg: '用户名不存在'
        })
        return
      }
      data.password = utils.changeWithMD5(data.password)
      await user.resetPassword(data)
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

router.get('/getAdminUserListByParams', (req, res) => {
  const data = req.query
  if (!data.params) {
    (async function() {
      try {
        const result = await user.getAdminUserListAll(data)
        const total = await user.getAdminUserListAllTotal(data)
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
        const result = await user.getAdminUserListByParams(JSON.parse(data.params), data)
        const total = await user.getAdminUserListByParamsTotal(JSON.parse(data.params), data)
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
