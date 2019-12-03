'use strict'

import Koa from 'koa'
import logger from 'koa-logger'
import helmet from 'koa-helmet'
import compress from 'koa-compress'
import body from 'koa-body'
import cors from 'koa2-cors'

import user from './routes/user'

const app = new Koa()

app.use(cors())
app.use(body())
app.use(logger())
app.use(helmet())
app.use(compress())

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    console.log(err)
    ctx.status = err.statusCode || err.status || 500
    ctx.body = {
      error: {
        code: 'unhandled_error',
        message: 'Something went wrong'
      }
    }
  }
})

app.use(user.routes())

export default app

if (!module.parent) {
  app.listen(process.env.PORT || 3000)
}
