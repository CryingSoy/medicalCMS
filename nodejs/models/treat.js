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
