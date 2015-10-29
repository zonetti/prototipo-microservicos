exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('comments', function (table) {
      table.increments()
      table.string('app_id').notNullable()
      table.integer('artifact_id').notNullable()
      table.integer('account_id').notNullable()
      table.text('comment').notNullable()
      table.timestamps()
    })
  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('comments')
  ])
}
