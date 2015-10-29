var knex = require('knex')
var bookshelf = require('bookshelf')

var dbConfig = knex(CONFIG.db[CONFIG.env])

module.exports = bookshelf(dbConfig)
