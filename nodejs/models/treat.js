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
