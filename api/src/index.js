var express = require('express')
var expressLogger = require('morgan')
var bodyParser = require('body-parser')

var app = express()

if (CONFIG.env !== 'test') {
  app.use(expressLogger('dev'))
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  next()
})

app.use('/', require('./routes'))

app.use((err, req, res, next) => {
  if (err.message) {
    var response = {
      message: err.message
    }
    if (err.data) {
      response.data = err.data
    }
    res.status(400).send(response)
  } else {
    res.status(500).send({
      message: 'Erro inesperado. Tente novamente mais tarde.'
    })
  }
})

app.use((req, res, next) => {
  res.status(404).send({
    message: 'Rota inexistente.'
  })
})

app.listen(3000, err => {
  if (err) throw err
  console.log('API escutando porta 3000')
  console.log('Ambiente: ' + CONFIG.env)
})
