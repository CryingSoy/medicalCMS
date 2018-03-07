const mysql = require('../mysql')

exports.updateAuthTable = data => {
  return new Promise((resolve, reject) => {
    try {
      const sqlcommand = `update authInfo set authArr = '${data.authArr}' where level = '${data.type}'`
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

exports.getAuthTable = type => {
  return new Promise((resolve, reject) => {
    let sqlcommand = ''
    if (!type) {
      sqlcommand = 'select authArr from authInfo'
    } else {
      sqlcommand = `select authArr from authInfo where level = '${type}'`
    }
    try {
      mysql.mysqlConnection.query(sqlcommand, (error, rows, fields) => {
        if (error) {
          reject(error)
        }
        if (rows.length > 0) {
          resolve(rows)
        } else {
          resolve('')
        }
      })
    } catch (error) {
      console.error(error)
    }
  })
}
