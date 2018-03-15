const express = require('express')
const router = express.Router()
const smodel = require('../models/student')
const tmodel = require('../models/treat')

router.get('/getStudentInfo', (req, res) => {
  const data = req.query
  if (!data.cardId) {
    res.json({
      code: -1,
      msg: 'cardId不能为空'
    })
    return
  }
  (async function() {
    try {
      const result = await smodel.querycardId(data.cardId)
      const historyTreat = await tmodel.queryTreatByCardId(data.cardId)
      res.json({
        code: 1,
        msg: '查询成功',
        data: {
          ...result,
          historyTreat
        }
      })
    } catch (error) {
      console.log(error)
      res.json({
        code: -1,
        msg: '服务器错误或传参错误'
      })
    }
  })()
})

router.post('/saveStudentInfo', (req, res) => {
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

router.post('/removeStudentInfo', (req, res) => {
  const data = req.body
  if (!data.cardId) {
    res.json({
      code: -1,
      msg: 'cardId不能为空'
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
      await smodel.removeStudentInfo(data.cardId)
      res.json({
        code: 1,
        msg: `删除cardId为${data.cardId}成功`
      })
    } catch (error) {
      console.log(error)
      res.json({
        code: -1,
        msg: '参数错误或服务器错误'
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

module.exports = router
