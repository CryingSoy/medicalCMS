const mysql = require('../mysql')

exports.saveDurgsInfo = data => {
  return new Promise((resolve, reject) => {
    try {
      const sqlcommand = `insert into drugsInfo(mBarcode,mType,mClassify,factory,mUnit,mUseWay,mTreatment,mRemark,mBatch,mStock,mInPrice,mOutPrice,mProduceTime,mOverdueTime,inputer) value('${data.mBarcode}','${data.mType}','${data.mClassify}','${data.factory || ''}','${data.mUnit}','${data.mUseWay}','${data.mTreatment}','${data.mRemark || ''}','${data.mBatch}','${data.mStock}','${data.mInPrice}','${data.mOutPrice}','${data.mProduceTime}','${data.mOverdueTime}','${data.inputer}')`
      mysql.mysqlConnection.query(sqlcommand, (error, rows, fields) => {
        if (error) {
          reject(error)
        }
        resolve()
      })
    } catch (error) {
      console.error(error)
    }
  })
}

exports.saveDurgsFlow = data => {
  return new Promise((resolve, reject) => {
    try {
      const sqlcommand = `insert into drugsFlow(mBarcode,inputer,user,useType,useNum,useTotal,mark) value('${data.mBarcode}','${data.inputer || ''}','${data.user || ''}','${data.type}','${data.mStock}','${parseFloat(data.mStock) * parseFloat(data.mInPrice)}','${data.mark || ''}')`
      mysql.mysqlConnection.query(sqlcommand, (error, rows, fields) => {
        if (error) {
          reject(error)
        }
        resolve()
      })
    } catch (error) {
      console.error(error)
    }
  })
}
