var db = require('./db')

module.exports.Account = db.Model.extend({
  tableName: 'accounts',
  hasTimestamps: ['created_at', 'updated_at']
})
