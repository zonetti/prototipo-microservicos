var db = require('./db')

module.exports.Comment = db.Model.extend({
  tableName: 'comments',
  hasTimestamps: ['created_at', 'updated_at']
})
