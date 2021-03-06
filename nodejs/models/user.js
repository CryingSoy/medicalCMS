const mysql = require('../mysql')

/**
 * 查询用户名是否存在
 * @param  {String}  - username
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

exports.queryUsernameE = username => {
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

/**
 * 查询用户名是否存在(userInfo表)
 * @param  {String}  - username
 * @return {Boolean} - false已存在，true不存在
 */
exports.queryUsernameInUserinfo = username => {
  return new Promise((resolve, reject) => {
    try {
      const sqlcommand = `select * from userInfo where username = '${username}'`
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

exports.getUserInfo = username => {
  return new Promise((resolve, reject) => {
    try {
      const sqlcommand = `select username, level from adminUser where username = '${username}'`
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

exports.addUser = data => {
  return new Promise((resolve, reject) => {
    try {
      let sqlcommand = ''
      if (data.type === 'admin') {
        sqlcommand = `insert into adminUser(username,password,level) value('${data.username}','${data.password}','超级管理员')`
      } else if (data.type === 'doctor') {
        sqlcommand = `insert into adminUser(username,password,level) value('${data.username}','${data.password}','校医')`
      }
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

exports.removeUser = username => {
  return new Promise((resolve, reject) => {
    try {
      const sqlcommand = `delete from adminUser where username='${username}'`
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

exports.getUser = (type, data) => {
  return new Promise((resolve, reject) => {
    try {
      let sqlcommand = ''
      if (type === 'admin' || type === 'adminDoctor') {
        sqlcommand = `select * from adminUser where level = '${type === 'admin' ? '超级管理员' : '校医'}'`
      } else {
        sqlcommand = `select * from userInfo where type = '${type}'`
      }
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

exports.resetPassword = data => {
  return new Promise((resolve, reject) => {
    let sqlcommand = ''
    if (!data.type) {
      sqlcommand = `update adminUser set password = '${data.password}' where username = '${data.username}'`
    } else if (data.type === 'userInfo') {
      sqlcommand = `update userInfo set password = '${data.password}' where username = '${data.username}'`
    }
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

exports.getUserListAll = data => {
  return new Promise((resolve, reject) => {
    try {
      const sqlcommand = `select * from externalUser limit ${((data.page || 1) - 1) * (data.pageSize || 10)}, ${data.pageSize || 10}`
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

exports.getUserListAllTotal = data => {
  return new Promise((resolve, reject) => {
    try {
      const sqlcommand = `select count(*) from externalUser limit ${((data.page || 1) - 1) * (data.pageSize || 10)}, ${data.pageSize || 10}`
      mysql.mysqlConnection.query(sqlcommand, (error, rows, fields) => {
        if (error) {
          reject(error)
        }
        resolve(rows[0]['count(*)'])
      })
    } catch (error) {
      console.error(error)
    }
  })
}

exports.getUserListByParamsTotal = (params, data) => {
  let sqlcommand = `select count(*) from externalUser where ${params[0].name} = '${params[0].word}'`
  params.splice(0, 1)
  if (params.length > 0) {
    params.forEach(e => {
      sqlcommand += `and ${e.name} = '${e.word}'`
    })
  }
  return new Promise((resolve, reject) => {
    try {
      mysql.mysqlConnection.query(sqlcommand, (error, rows, fields) => {
        if (error) {
          reject(error)
        }
        resolve(rows[0]['count(*)'])
      })
    } catch (error) {
      console.error(error)
    }
  })
}

exports.getUserListByParams = (params, data) => {
  let sqlcommand = `select * from externalUser where ${params[0].name} = '${params[0].word}'`
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

exports.getAdminUserListByParamsTotal = (params, data) => {
  let sqlcommand = `select count(*) from adminUser where ${params[0].name} = '${params[0].word}'`
  params.splice(0, 1)
  if (params.length > 0) {
    params.forEach(e => {
      sqlcommand += `and ${e.name} = '${e.word}'`
    })
  }
  return new Promise((resolve, reject) => {
    try {
      mysql.mysqlConnection.query(sqlcommand, (error, rows, fields) => {
        if (error) {
          reject(error)
        }
        resolve(rows[0]['count(*)'])
      })
    } catch (error) {
      console.error(error)
    }
  })
}

exports.getAdminUserListByParams = (params, data) => {
  let sqlcommand = `select * from adminUser where ${params[0].name} = '${params[0].word}'`
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
