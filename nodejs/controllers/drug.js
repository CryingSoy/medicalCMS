const express = require('express')
const router = express.Router()
const drug = require('../models/drug')

router.post('/saveDrugsInfo', (req, res) => {
  const data = req.body
  if (!data.mBarcode) {
    res.json({
      code: -1,
      msg: '条形码不能为空'
    })
    return
  }
  if (!data.mType) {
    res.json({
      code: -1,
      msg: '药品类型不能为空'
    })
    return
  }
  if (!data.mClassify) {
    res.json({
      code: -1,
      msg: '归属分类不能为空'
    })
    return
  }
  if (!data.mUnit) {
    res.json({
      code: -1,
      msg: '药品规格不能为空'
    })
    return
  }
  if (!data.mUseWay) {
    res.json({
      code: -1,
      msg: '用药方式不能为空'
    })
    return
  }
  if (!data.mTreatment) {
    res.json({
      code: -1,
      msg: '用药疗程不能为空'
    })
    return
  }
  if (!data.mBatch) {
    res.json({
      code: -1,
      msg: '药品批号不能为空'
    })
    return
  }
  if (!data.mInPrice) {
    res.json({
      code: -1,
      msg: '进货价格不能为空'
    })
    return
  }
  if (!data.mOutPrice) {
    res.json({
      code: -1,
      msg: '售价不能为空'
    })
    return
  }
  if (!data.mStock) {
    res.json({
      code: -1,
      msg: '库存不能为空'
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
  if (!data.mProduceTime) {
    res.json({
      code: -1,
      msg: '生产日期不能为空'
    })
    return
  }
  if (!data.mOverdueTime) {
    res.json({
      code: -1,
      msg: '有效期不能为空'
    })
    return
  }
  if (!data.inputer) {
    res.json({
      code: -1,
      msg: 'inputer不能为空'
    })
    return
  }
  if (!data.mName) {
    res.json({
      code: -1,
      msg: '名字不能为空'
    })
    return
  }
  (async function() {
    try {
      await drug.saveDurgsInfo(data)
      await drug.saveDurgsFlow(data)
      res.json({
        code: 1,
        msg: '录入成功'
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

router.get('/getDrugsInfo', (req, res) => {
  const data = req.query
  if (!data.params) {
    (async function() {
      try {
        const result = await drug.getDrugsInfoAll()
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
        const result = await drug.getDrugsInfoByParams(JSON.parse(data.params))
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

router.post('/updateDrugInfo', (req, res) => {
  const data = req.body
  if (!data.mName) {
    res.json({
      code: -1,
      msg: '名字不能为空'
    })
    return
  }
  if (!data.id) {
    res.json({
      code: -1,
      msg: 'id不能为空'
    })
    return
  }
  if (!data.mType) {
    res.json({
      code: -1,
      msg: '药品类型不能为空'
    })
    return
  }
  if (!data.mClassify) {
    res.json({
      code: -1,
      msg: '归属分类不能为空'
    })
    return
  }
  if (!data.mUnit) {
    res.json({
      code: -1,
      msg: '药品规格不能为空'
    })
    return
  }
  if (!data.mUseWay) {
    res.json({
      code: -1,
      msg: '用药方式不能为空'
    })
    return
  }
  if (!data.mTreatment) {
    res.json({
      code: -1,
      msg: '用药疗程不能为空'
    })
    return
  }
  if (!data.mBatch) {
    res.json({
      code: -1,
      msg: '药品批号不能为空'
    })
    return
  }
  if (!data.mInPrice) {
    res.json({
      code: -1,
      msg: '进货价格不能为空'
    })
    return
  }
  if (!data.mOutPrice) {
    res.json({
      code: -1,
      msg: '售价不能为空'
    })
    return
  }
  if (!data.mProduceTime) {
    res.json({
      code: -1,
      msg: '生产日期不能为空'
    })
    return
  }
  if (!data.mOverdueTime) {
    res.json({
      code: -1,
      msg: '有效期不能为空'
    })
    return
  }
  if (!data.inputer) {
    res.json({
      code: -1,
      msg: 'inputer不能为空'
    })
    return
  }
  (async function() {
    try {
      await drug.updateDrugInfo(data)
      res.json({
        code: 1,
        msg: '更改成功'
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
