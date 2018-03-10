const mysql = require('../mysql')

exports.getContentByName = data => {
  return new Promise((resolve, reject) => {
    try {
      const sqlcommand = `select * from others where name = '${data.name}'`
      mysql.mysqlConnection.query(sqlcommand, (error, rows, fields) => {
        if (error) {
          reject(error)
        }
        resolve(rows[0].content)
      })
    } catch (error) {
      console.error(error)
    }
  })
}

exports.changeOthersByName = data => {
  return new Promise((resolve, reject) => {
    try {
      const sqlcommand = `update others set content = '${data.content}' where name = '${data.name}'`
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
