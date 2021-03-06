const mysql = require('../mysql')

exports.querycardId = cardId => {
  return new Promise((resolve, reject) => {
    try {
      const sqlcommand = `select * from studentInfo where cardId = '${cardId}'`
      mysql.mysqlConnection.query(sqlcommand, (error, rows, fields) => {
        if (error) {
          reject(error)
        }
        if (rows.length > 0) {
          resolve({
            isExist: true,
            info: rows[0]
          })
        } else {
          resolve({
            isExist: false
          })
        }
      })
    } catch (error) {
      console.error(error)
    }
  })
}

exports.saveStudentInfo = data => {
  return new Promise((resolve, reject) => {
    try {
      const sqlcommand = `insert into studentInfo(name, age, sex, height, weight, blood, room, allergy, cardId, stuId, depart, phone) value('${data.name}', '${data.age}', '${data.sex}', '${data.height || ''}', '${data.weight || ''}', '${data.blood || ''}', '${data.room || ''}', '${data.allergy || ''}', '${data.cardId}', '${data.stuId}', '${data.depart || ''}', '${data.phone || ''}')`
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

exports.removeStudentInfo = cardId => {
  return new Promise((resolve, reject) => {
    try {
      const sqlcommand = `delete from studentInfo where cardId='${cardId}'`
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

exports.changeStudentInfo = data => {
  return new Promise((resolve, reject) => {
    try {
      const sqlcommand = `update studentInfo set name = '${data.name}', age = '${data.age}', sex = '${data.sex}', height = '${data.height || ''}', weight = '${data.weight || ''}', blood = '${data.blood || ''}', room = '${data.room || ''}', allergy = '${data.allergy || ''}', stuId = '${data.stuId}', depart = '${data.depart || ''}', phone = '${data.phone || ''}' where cardId = '${data.cardId}'`
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

exports.getStudentInfoByParams = (params, data) => {
  let sqlcommand = `select * from studentInfo where ${params[0].name} = '${params[0].word}'`
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

exports.getStudentInfoByParamsTotal = (params, data) => {
  let sqlcommand = `select count(*) from studentInfo where ${params[0].name} = '${params[0].word}'`
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
