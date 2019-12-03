'use strict'

import {
  getUsers,
  createUsers,
  deleteUsers,
  updateUsers
} from '../helpers/db_queries_users'

import {
  createAddresses
} from '../helpers/db_queries_addresses'

import {
  validate
} from '../helpers/validator'

export const users = async () => {
  const users = await getUsers()
  const response = []
  for (const user of users) {
    delete user.address_id
    delete user.from_user_id
    delete user.created_at
    const { user_id: id, name, email, birthDate: birth, ...address } = user
    const birthDate = birth.toUTCString()
    response.push({
      user: {
        id,
        name,
        email,
        birthDate,
        address
      }
    })
  }
  return response
}

export const getUser = async (userId) => {
  if (isNaN(parseInt(userId, 10))) {
    return {
      status: 400
    }
  }
  const user = (await getUsers({
    user_id: userId
  }))[0]
  if (user === undefined) {
    return {
      status: 404
    }
  }
  delete user.address_id
  delete user.from_user_id
  delete user.created_at
  const { user_id: id, name, email, birthDate, ...address } = user
  return {
    user: {
      id,
      name,
      email,
      birthDate,
      address
    }
  }
}

export const createUser = async (user) => {
  if (!user) {
    return {
      status: 405
    }
  }
  const validation = validate(user)
  if (!validation) {
    return {
      status: 405
    }
  }
  const res = (await createUsers({
    name: user.name,
    email: user.email,
    birthDate: new Date(user.birthDate)
  }))[0]
  await createAddresses({
    from_user_id: parseInt(res.user_id, 10),
    ...user.address
  })
  const response = {
    id: parseInt(res.user_id, 10),
    ...user
  }
  response.birthDate = res.birthDate.toUTCString()
  return {
    status: 201,
    body: response
  }
}

export const updateUser = async (userId, user) => {
  if (!user) return 405
  const validation = validate(user)
  if (!validation) return 405
  const { address, ...data } = user
  if (isNaN(parseInt(userId, 10))) return 400
  const res = await updateUsers({
    user_id: userId
  }, data)
  if (res.length === 0) return 404
  return 200
}

export const deleteUser = async (userId) => {
  if (isNaN(parseInt(userId, 10))) return 400
  const res = await deleteUsers({
    user_id: userId
  })
  if (res === 0) return 404
  return 200
}
