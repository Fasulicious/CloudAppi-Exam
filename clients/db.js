'use strict'

import * as cfg from '../knexfile'
import knex from 'knex'

const env = process.env.NODE_ENV || 'development'
const db = knex(cfg[env])

export default db
