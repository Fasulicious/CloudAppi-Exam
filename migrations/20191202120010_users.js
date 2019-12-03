
exports.up = knex => knex.schema.createTable('users', table => {
  table.increments('user_id')
  table.string('name', 40).notNullable()
  table.string('email', 40).notNullable()
  table.timestamp('birthDate').notNullable()
  table.timestamp('created_at').defaultTo(knex.fn.now())
})

exports.down = knex => knex.schema.dropTable('users')
