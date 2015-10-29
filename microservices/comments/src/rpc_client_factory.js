module.exports = (rpc) => {
  return (serviceName, params, callback) => {
    var timeout = setTimeout(() => {
      callback({
        message: 'Nenhum provedor deste serviço se encontra disponível no momento.',
        data: 'timeout'
      })
    }, 1000 * 10)

    rpc.call(serviceName, params, (err, result) => {
      clearTimeout(timeout)
      callback(err, result)
    })
  }
}
