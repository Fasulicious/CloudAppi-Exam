'use strict'

import db from '../clients/db'

export const getUsers = (where = {}) => db('users').where(where).innerJoin('addresses', 'users.user_id', 'addresses.from_user_id')

export const createUsers = (data) => db('users').insert(data).returning('*')

export const deleteUsers = (where) => db('users').where(where).del()

export const updateUsers = (where, data) => db('users').where(where).update('name', data.name).update('email', data.email).update('birthDate', data.birthDate).returning('user_id')
