exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('accounts', function (table) {
      table.increments()
      table.string('app_id').notNullable()
      table.string('name').notNullable()
      table.string('username').notNullable()
      table.string('password').notNullable()
      table.timestamps()
    })
  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('accounts')
  ])
}
