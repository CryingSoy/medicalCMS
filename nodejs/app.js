const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')

const port = 3001

app.use(express.static(__dirname + '/public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
  secret: 'sessionId',
  resave: false,
  saveUninitialized: true
}))

app.use('/admin', require('./middlewares/user'))
app.use('/admin', require('./controllers'))

app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})
