var db = require('./db')

module.exports.Post = db.Model.extend({
  tableName: 'posts',
  hasTimestamps: ['created_at', 'updated_at']
})
