const mysql = require('../mysql')

exports.queryUsername = username => {
  return new Promise((resolve, reject) => {
    try {
      const sqlcommand = `select * from externalUser where username = '${username}'`
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
      const sqlcommand = `select password from externalUser where username = '${username}'`
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
      const sqlcommand = `update externalUser set token = '${token}' where username = '${username}'`
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
      const sqlcommand = `select token from externalUser where username = '${username}'`
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

exports.getUserInfo = username => {
  return new Promise((resolve, reject) => {
    try {
      const sqlcommand = `select * from externalUser where username = '${username}'`
      mysql.mysqlConnection.query(sqlcommand, (error, rows, fields) => {
        if (error) {
          reject(error)
        }
        if (rows.length > 0) {
          resolve(rows[0])
        } else {
          resolve('')
        }
      })
    } catch (error) {
      console.error(error)
    }
  })
}

exports.resetPassword = data => {
  return new Promise((resolve, reject) => {
    const sqlcommand = `update externalUser set password = '${data.password}' where username = '${data.username}'`
    try {
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
