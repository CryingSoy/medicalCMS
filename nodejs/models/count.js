const mysql = require("../mysql")

exports.add = data => {
  return new Promise((resolve, reject) => {
    try {
      const sqlcommand = `insert into record(time,type,money,remark) value('${data.time}','${data.type}','${data.money}','${data.remark || ''}')`
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

exports.query = () => {
  return new Promise((resolve, reject) => {
    try {
      const sqlcommand = `select * from record order by id`
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

exports.delete = data => {
  return new Promise((resolve, reject) => {
    try {
      const sqlcommand = `delete from record where id='${data.id}'`
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

exports.update = data => {
  return new Promise((resolve, reject) => {
    try {
      const sqlcommand = `update record set time = '${data.time}', type = '${data.type}', money = '${data.money}', remark = '${data.remark || ''}' where id = '${data.id}'`
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
