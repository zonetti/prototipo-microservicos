require('../../bootstrap')
var knex = require('../../src/db').knex

module.exports = (callback) => {
  knex('accounts').truncate().then(() => {
    callback()
  })
}
