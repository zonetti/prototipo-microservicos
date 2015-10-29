require('../../bootstrap')
var knex = require('../../src/db').knex

module.exports = (callback) => {
  knex('comments').truncate().then(() => {
    callback()
  })
}
