'use strict'

import Router from 'koa-router'

import {
  users,
  getUser,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/user'

const router = new Router({ prefix: '/users' })

router.get('/getusers', async (ctx) => {
  ctx.body = await users()
})

router.get('/getusersById/:userId', async (ctx) => {
  const { userId } = ctx.params
  const response = await getUser(userId)
  if (response.status) ctx.status = response.status
  else ctx.body = response
})

router.post('/createUsers', async (ctx) => {
  const { user } = ctx.request.body
  const response = await createUser(user)
  if (response.body) {
    ctx.status = response.status
    ctx.body = response.body
  } else {
    ctx.status = response.status
  }
})

router.put('/updateUsersById/:userId', async (ctx) => {
  const { userId } = ctx.params
  const { user } = ctx.request.body
  ctx.status = await updateUser(userId, user)
})

router.delete('/deleteUsersById/:userId', async (ctx) => {
  const { userId } = ctx.params
  ctx.status = await deleteUser(userId)
})

export default router
