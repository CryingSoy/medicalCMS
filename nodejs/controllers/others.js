const express = require('express')
const router = express.Router()
const others = require('../models/others')

router.get('/getOthersByName', (req, res) => {
  const data = req.query
  if (!data.name) {
    res.json({
      code: -1,
      msg: '名字不能为空'
    })
    return
  }
  (async function() {
    try {
      const result = await others.getContentByName(data)
      res.json({
        code: 1,
        msg: '查询成功',
        data: result
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

router.post('/changeOthersByName', (req, res) => {
  const data = req.body
  if (!data.name) {
    res.json({
      code: -1,
      msg: '名字不能为空'
    })
    return
  }
  if (!data.content) {
    res.json({
      code: -1,
      msg: 'content不能为空'
    })
    return
  }
  (async function() {
    try {
      await others.changeOthersByName(data)
      res.json({
        code: 1,
        msg: '内容更改成功'
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
module.exports = router
