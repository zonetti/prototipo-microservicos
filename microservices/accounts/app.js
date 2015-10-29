require('./bootstrap')
require('./src')

// Tratamento para o fechamento do processo (Ctrl-C) no Windows

if (process.platform === 'win32') {
  var readLine = require('readline')
  var rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  rl.on('SIGINT', function () {
    process.emit('SIGINT')
  })
}

process.on('SIGINT', process.exit)
