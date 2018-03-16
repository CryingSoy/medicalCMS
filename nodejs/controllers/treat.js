const express = require('express')
const router = express.Router()
const model = require('../models/treat')
const dmodel = require('../models/drug')
const rmodel = require('../models/rest')

router.post('/saveTreatInfo', (req, res) => {
  const data = req.body
  if (!data.cardId) {
    res.json({
      code: -1,
      msg: 'cardId不能为空'
    })
    return
  }
  if (!data.name) {
    res.json({
      code: -1,
      msg: 'name不能为空'
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
  if (!data.disease) {
    res.json({
      code: -1,
      msg: '症状名不能为空'
    })
    return
  }
  if (!data.medicineDetail) {
    res.json({
      code: -1,
      msg: 'medicineDetail不能为空'
    })
    return
  }
  if (!data.doctor) {
    res.json({
      code: -1,
      msg: 'doctor不能为空'
    })
    return
  }
  if (!data.totalPrice) {
    res.json({
      code: -1,
      msg: 'totalPrice不能为空'
    })
    return
  }
  !(async function() {
    try {
      const numsArr = JSON.parse(data.medicineDetail)
      // 验证库存是否足够
      const stockArr = []
      for (const e of numsArr) {
        const result = await dmodel.getDrugStockById(e.id)
        stockArr.push(result)
      }
      for (const i in stockArr) {
        if (stockArr[i] < numsArr[i].num) {
          res.json({
            code: -1,
            msg: `药物${numsArr[i].name}库存不足`
          })
          return
        }
      }

      // 减少库存
      const reducedArr = stockArr.map((e, i) => {
        return e - +numsArr[i].num
      })
      for (let i = 0,length = reducedArr.length; i < length; i++) {
        await dmodel.updateStock({ id: numsArr[i].id, num: reducedArr[i] })
      }

      // 增加药品流向
      const curTime = +new Date()
      for (const e of numsArr) {
        await dmodel.saveDurgsFlowV2({
          mBarcode: e.mBarcode,
          inputer: data.doctor,
          user: data.name,
          type: 'out',
          mStock: e.num,
          useTotal: e.price,
          mark: `为${data.name}治疗`,
          mName: e.name,
          useTime: curTime
        })
      }

      // 增加请假
      if (data.restTime) {
        await rmodel.saveRestInfo({
          stuId: data.stuId,
          name: data.name,
          disease: data.disease,
          treatTime: curTime,
          doctor: data.doctor,
          restTime: data.restTime
        })
      }

      // 增加到就诊表
      data.treatTime = curTime
      await model.saveTreatInfo(data)
      res.json({
        code: 1,
        msg: '就诊信息已经储存'
      })
    } catch (error) {
      console.log(error)
      res.json({
        code: -1,
        msg: '服务器错误或参数错误'
      })
    }
  })()
})

router.get('/getTreatInfoByParams', (req, res) => {
  const data = req.query
  if (!data.params) {
    (async function() {
      try {
        const result = await model.getTreatInfoAll(data)
        res.json({
          code: 1,
          msg: `查询成功，共查到${result.length}条数据`,
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
  } else {
    (async function() {
      try {
        const result = await model.getTreatInfoByParams(JSON.parse(data.params), data)
        res.json({
          code: 1,
          msg: `查询成功，共查到${result.length}条数据`,
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
  }
})

module.exports = router
