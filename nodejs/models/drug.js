const mysql = require('../mysql')

exports.saveDurgsInfo = data => {
  return new Promise((resolve, reject) => {
    try {
      const sqlcommand = `insert into drugsInfo(mBarcode,mType,mClassify,factory,mUnit,mUseWay,mTreatment,mRemark,mBatch,mStock,mInPrice,mOutPrice,mProduceTime,mOverdueTime,inputer,mInTime,mName) value('${parseInt(data.mBarcode)}','${data.mType}','${data.mClassify}','${data.factory || ''}','${data.mUnit}','${data.mUseWay}','${data.mTreatment}','${data.mRemark || ''}','${data.mBatch}','${parseInt(data.mStock)}','${data.mInPrice}','${data.mOutPrice}','${data.mProduceTime}','${data.mOverdueTime}','${data.inputer}','${new Date().getTime()}','${data.mName}')`
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
      const sqlcommand = `insert into drugsFlow(mBarcode,inputer,user,useType,useNum,useTotal,mark,mName,useTime) value('${data.mBarcode}','${data.inputer || ''}','${data.user || ''}','${data.type}','${parseInt(data.mStock)}','${parseFloat(data.mStock) * parseFloat(data.mInPrice)}','${data.mark || ''}','${data.mName}','${new Date().getTime()}')`
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

exports.getDrugsInfoAll = data => {
  return new Promise((resolve, reject) => {
    try {
      const sqlcommand = `select * from drugsInfo limit ${((data.page || 1) - 1) * (data.pageSize || 10)}, ${data.pageSize || 10}`
      mysql.mysqlConnection.query(sqlcommand, (error, rows, fields) => {
        if (error) {
          reject(error)
        }
        resolve(rows)
      })
    } catch (error) {
      console.error(error)
    }
  })
}

exports.getDrugsInfoByParams = (params, data) => {
  let sqlcommand = `select * from drugsInfo where ${params[0].name} = '${params[0].word}'`
  params.splice(0, 1)
  if (params.length > 0) {
    params.forEach(e => {
      sqlcommand += `and ${e.name} = '${e.word}'`
    })
  }
  sqlcommand += ` limit ${((data.page || 1) - 1) * (data.pageSize || 10)}, ${data.pageSize || 10}`
  return new Promise((resolve, reject) => {
    try {
      mysql.mysqlConnection.query(sqlcommand, (error, rows, fields) => {
        if (error) {
          reject(error)
        }
        resolve(rows)
      })
    } catch (error) {
      console.error(error)
    }
  })
}

exports.updateDrugInfo = data => {
  const sqlcommand = `update drugsInfo set mType = '${data.mType}', mClassify = '${data.mClassify}', factory = '${data.factory || ''}', mUnit = '${data.mUnit}', mUseWay = '${data.mUseWay}', mTreatment = '${data.mTreatment}', mRemark = '${data.mRemark || ''}', mBatch = '${data.mBatch}', mInPrice = '${data.mInPrice}', mOutPrice = '${data.mOutPrice}', mProduceTime = '${data.mProduceTime}', mOverdueTime = '${data.mOverdueTime}', inputer = '${data.inputer}', mName = '${data.mName}' where id = ${data.id}`
  return new Promise((resolve, reject) => {
    try {
      mysql.mysqlConnection.query(sqlcommand, (error, rows, fields) => {
        if (error) {
          reject(error)
        }
        resolve()
      })
    } catch (error) {
      console.log(error)
    }
  })
}

exports.queryDrugStock = data => {
  return new Promise((resolve, reject) => {
    try {
      const sqlcommand = `select mStock from drugsInfo where id = '${data.id}'`
      mysql.mysqlConnection.query(sqlcommand, (error, rows, fields) => {
        if (error) {
          reject(error)
        }
        resolve(rows[0].mStock)
      })
    } catch (error) {
      console.error(error)
    }
  })
}

exports.updateStock = data => {
  return new Promise((resolve, reject) => {
    try {
      const sqlcommand = `update drugsInfo set mStock = '${data.num}' where id = '${data.id}'`
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

exports.getOverdueByDay = (deadline, data) => {
  return new Promise((resolve, reject) => {
    try {
      const sqlcommand = `select * from drugsInfo where mOverdueTime < ${deadline} limit ${((data.page || 1) - 1) * (data.pageSize || 10)}, ${data.pageSize || 10}`
      mysql.mysqlConnection.query(sqlcommand, (error, rows, fields) => {
        if (error) {
          reject(error)
        }
        resolve(rows)
      })
    } catch (error) {
      console.error(error)
    }
  })
}

exports.getDrugByTime = data => {
  return new Promise((resolve, reject) => {
    try {
      const sqlcommand = `select * from drugsInfo where ${data.type} < ${data.endTime} and ${data.type} > ${data.startTime} limit ${((data.page || 1) - 1) * (data.pageSize || 10)}, ${data.pageSize || 10}`
      mysql.mysqlConnection.query(sqlcommand, (error, rows, fields) => {
        if (error) {
          reject(error)
        }
        resolve(rows)
      })
    } catch (error) {
      console.error(error)
    }
  })
}

exports.getDrugsFlowAll = data => {
  return new Promise((resolve, reject) => {
    try {
      const sqlcommand = `select * from drugsFlow limit ${((data.page || 1) - 1) * (data.pageSize || 10)}, ${data.pageSize || 10}`
      mysql.mysqlConnection.query(sqlcommand, (error, rows, fields) => {
        if (error) {
          reject(error)
        }
        resolve(rows)
      })
    } catch (error) {
      console.error(error)
    }
  })
}

exports.getDrugsFlowByParams = (params, data) => {
  let sqlcommand = `select * from drugsFlow where ${params[0].name} = '${params[0].word}'`
  params.splice(0, 1)
  if (params.length > 0) {
    params.forEach(e => {
      sqlcommand += `and ${e.name} = '${e.word}'`
    })
  }
  sqlcommand += ` limit ${((data.page || 1) - 1) * (data.pageSize || 10)}, ${data.pageSize || 10}`
  return new Promise((resolve, reject) => {
    try {
      mysql.mysqlConnection.query(sqlcommand, (error, rows, fields) => {
        if (error) {
          reject(error)
        }
        resolve(rows)
      })
    } catch (error) {
      console.error(error)
    }
  })
}

exports.getDrugFlowByTime = data => {
  return new Promise((resolve, reject) => {
    try {
      const sqlcommand = `select * from drugsFlow where ${data.type} < ${data.endTime} and ${data.type} > ${data.startTime} limit ${((data.page || 1) - 1) * (data.pageSize || 10)}, ${data.pageSize || 10}`
      mysql.mysqlConnection.query(sqlcommand, (error, rows, fields) => {
        if (error) {
          reject(error)
        }
        resolve(rows)
      })
    } catch (error) {
      console.error(error)
    }
  })
}
