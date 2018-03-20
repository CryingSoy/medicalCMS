const mysql = require('../mysql')

exports.queryTreatByCardId = cardId => {
  return new Promise((resolve, reject) => {
    try {
      const sqlcommand = `select * from treatInfo where cardId = '${cardId}'`
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

exports.saveTreatInfo = data => {
  return new Promise((resolve, reject) => {
    try {
      const sqlcommand = `insert into treatInfo(cardId, stuId, name, treatTime, disease, diseaseDetail, medicineDetail, doctor, totalPrice, doctorRemark) value('${data.cardId}', '${data.stuId}', '${data.name}', '${data.treatTime || +new Date()}', '${data.disease}', '${data.diseaseDetail || ''}', '${data.medicineDetail}', '${data.doctor}', '${+data.totalPrice}', '${data.doctorRemark || ''}')`
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

exports.getTreatInfoAll = data => {
  return new Promise((resolve, reject) => {
    try {
      const sqlcommand = `select * from treatInfo limit ${((data.page || 1) - 1) * (data.pageSize || 10)}, ${data.pageSize || 10}`
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

exports.getTreatInfoByParams = (params, data) => {
  let sqlcommand = `select * from treatInfo where ${params[0].name} = '${params[0].word}'`
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

exports.getTreatInfoByTime = data => {
  return new Promise((resolve, reject) => {
    try {
      const sqlcommand = `select * from treatInfo where ${data.type} < ${data.endTime} and ${data.type} > ${data.startTime} limit ${((data.page || 1) - 1) * (data.pageSize || 10)}, ${data.pageSize || 10}`
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

exports.getTreatInfoByPrice = data => {
  return new Promise((resolve, reject) => {
    try {
      const sqlcommand = `select * from treatInfo where totalPrice < ${data.largestAmount} and totalPrice > ${data.minimumAmount} limit ${((data.page || 1) - 1) * (data.pageSize || 10)}, ${data.pageSize || 10}`
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
