exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('posts', function (table) {
      table.increments()
      table.string('app_id').notNullable()
      table.integer('account_id').notNullable()
      table.string('title').notNullable()
      table.text('body').notNullable()
      table.timestamps()
    })
  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('posts')
  ])
}
