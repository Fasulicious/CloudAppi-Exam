
exports.up = knex => knex.schema.createTable('addresses', table => {
  table.increments('address_id')
  table.string('street')
  table.string('state')
  table.string('city')
  table.string('country')
  table.string('zip')
  table.integer('from_user_id').unsigned()
  table.foreign('from_user_id').references('users.user_id').onDelete('CASCADE').onUpdate('CASCADE')
})

exports.down = knex => knex.schema.dropTable('addresses')
