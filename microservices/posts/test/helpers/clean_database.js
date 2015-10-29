require('../../bootstrap')
var knex = require('../../src/db').knex

module.exports = (callback) => {
  knex('posts').truncate().then(() => {
    callback()
  })
}
