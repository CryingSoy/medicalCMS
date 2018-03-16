const mysql = require('../mysql')

exports.saveRestInfo = data => {
  return new Promise((resolve, reject) => {
    try {
      const sqlcommand = `insert into restInfo(stuId, name, disease, treatTime, doctor, restTime) value('${data.stuId}', '${data.name}', '${data.disease}', '${data.treatTime}', '${data.doctor}', '${data.restTime}')`
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
