const {
  DB_NAME: database,
  DB_USER: user,
  DB_PASSWORD: password,
  DB_HOST: host,
  DB_PORT: port
} = process.env

module.exports = {
  test: {
    debug: true,
    client: 'postgresql',
    connection: {
      database,
      user,
      password,
      host,
      port
    },
    pool: {
      min: 1,
      max: 5
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  development: {
    client: 'postgresql',
    connection: {
      database,
      user,
      password,
      host,
      port
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
}
