'use strict'

import test from 'ava'
import request from 'supertest'

import app from './app'
import db from './clients/db'

test.before(async () => {
  await db.raw('TRUNCATE TABLE users CASCADE')
})

test.serial(':/getusers: should return 200 http status code with an array of users', async t => {
  const response = await request(app.callback()).get('/users/getusers')
  t.is(response.status, 200)
})

test.serial(':/getusersById/:userId: should return 400 https status code if userId is not a number', async t => {
  const response = await request(app.callback()).get('/users/getusersById/uno')
  t.is(response.status, 400)
})

test.serial(':/getusersById/:userId: should return 404 https status code if userId doesnt exist', async t => {
  const response = await request(app.callback()).get('/users/getusersById/100000')
  t.is(response.status, 404)
})

test.serial(':/createUsers: should return 405 http status code if the input doesnt follow the schema', async t => {
  const response = await request(app.callback()).post('/users/createUsers').send({})
  t.is(response.status, 405)
})

test.serial(':/createUsers: should return 201 https statud code if everything is ok', async t => {
  const response = await request(app.callback()).post('/users/createUsers').send({
    user: {
      name: 'Antonio',
      email: 'fantoniosoto@gmail.com',
      birthDate: '1991-09-14',
      address: {
        street: 'Ancon',
        state: 'Lima',
        city: 'Lima',
        country: 'Peru',
        zip: '15123'
      }
    }
  })
  t.is(response.status, 201)
})

test.serial(':/getusersById/:userId: should return 200 http status code and the user info', async t => {
  const users = await request(app.callback()).get('/users/getusers')
  const id = users.body[0].user.id
  const response = await request(app.callback()).get(`/users/getusersById/${id}`)
  t.is(response.status, 200)
  t.is(typeof response.body, 'object')
})

test.serial(':/updateUsersById/:userId: should return 405 http status code if the input doesnt follow the schema', async t => {
  const response = await request(app.callback()).put('/users/updateUsersById/100000').send({})
  t.is(response.status, 405)
})

test.serial(':/updateUsersById/:userId: should return 400 https status code if userId is not a number', async t => {
  const response = await request(app.callback()).put('/users/updateUsersById/uno').send({
    user: {
      name: 'Fidel',
      email: 'fidel.soto@rappi.com',
      birthDate: '1991-09-14',
      address: {
        street: 'Ancon',
        state: 'Lima',
        city: 'Lima',
        country: 'Peru',
        zip: '15123'
      }
    }
  })
  t.is(response.status, 400)
})

test.serial(':/updateUsersById/:userId: should return 404 https status code if userId doesnt exists', async t => {
  const response = await request(app.callback()).put('/users/updateUsersById/100000').send({
    user: {
      name: 'Fidel',
      email: 'fidel.soto@rappi.com',
      birthDate: '1991-09-14',
      address: {
        street: 'Ancon',
        state: 'Lima',
        city: 'Lima',
        country: 'Peru',
        zip: '15123'
      }
    }
  })
  t.is(response.status, 404)
})

test.serial(':/updateUsersById/:userId: should return 200 https status code if everything is ok', async t => {
  const users = await request(app.callback()).get('/users/getusers')
  const id = users.body[0].user.id
  const response = await request(app.callback()).put(`/users/updateUsersById/${id}`).send({
    user: {
      name: 'Fidel',
      email: 'fidel.soto@rappi.com',
      birthDate: '1991-09-14',
      address: {
        street: 'Ancon',
        state: 'Lima',
        city: 'Lima',
        country: 'Peru',
        zip: '15123'
      }
    }
  })
  t.is(response.status, 200)
})

test.serial(':/deleteUsersById/:userId: should return 400 https status code if userId is not a number', async t => {
  const response = await request(app.callback()).delete('/users/deleteUsersById/one')
  t.is(response.status, 400)
})

test.serial(':/deleteUsersById/:userId: should return 404 https status code if userId doesnt exists', async t => {
  const response = await request(app.callback()).delete('/users/deleteByUsersById/100000')
  t.is(response.status, 404)
})

test.serial(':/deleteUsersById/:userId: should return 200 if everything is ok', async t => {
  const users = await request(app.callback()).get('/users/getusers')
  const id = users.body[0].user.id
  const response = await request(app.callback()).delete(`/users/deleteUsersById/${id}`)
  t.is(response.status, 200)
})

test.after(async () => {
  await db.raw('TRUNCATE TABLE users CASCADE')
})
