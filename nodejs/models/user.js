const mysql = require("../mysql")

/**
 * 查询用户名是否存在
 * @param  {String} username 
 * @return {Boolean} - false已存在，true不存在
 */
exports.queryUsername = username => {
  return new Promise((resolve, reject) => {
    try {
      const sqlcommand = `select * from adminUser where username = '${username}'`
      mysql.mysqlConnection.query(sqlcommand, (error, rows, fields) => {
        if (error) {
          reject(error)
        }
        if (rows.length > 0) {
          resolve(false)
        } else {
          resolve(true)
        }
      })
    } catch (error) {
      console.error(error)
    }
  })
}

exports.getPassword = username => {
  return new Promise((resolve, reject) => {
    try {
      const sqlcommand = `select password from adminUser where username = '${username}'`
      mysql.mysqlConnection.query(sqlcommand, (error, rows, fields) => {
        if (error) {
          reject(error)
        }
        if (rows.length > 0) {
          resolve(rows[0].password)
        } else {
          resolve('')
        }
      })
    } catch (error) {
      console.error(error)
    }
  })
}

exports.updateToken = (username, token) => {
  return new Promise((resolve, reject) => {
    try {
      const sqlcommand = `update adminUser set token = '${token}' where username = '${username}'`
      mysql.mysqlConnection.query(sqlcommand, (error, rows, fields) => {
        if (error) {
          reject(error)
        }
        resolve(token)
      })
    } catch (error) {
      console.error(error)
    }
  })
}

exports.getToken = username => {
  return new Promise((resolve, reject) => {
    try {
      const sqlcommand = `select token from adminUser where username = '${username}'`
      mysql.mysqlConnection.query(sqlcommand, (error, rows, fields) => {
        if (error) {
          reject(error)
        }
        if (rows.length > 0) {
          resolve(rows[0].token)
        } else {
          resolve('')
        }
      })
    } catch (error) {
      console.error(error)
    }
  })
}
