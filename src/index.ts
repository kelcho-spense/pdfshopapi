import "dotenv/config"
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { logger } from "hono/logger"
import { cors } from "hono/cors"
import { csrf } from 'hono/csrf'
import { prettyJSON } from 'hono/pretty-json'
import { trimTrailingSlash } from 'hono/trailing-slash'
import { prometheus } from '@hono/prometheus'
import user  from './users/user.router'

const app = new Hono().basePath('/api')
const { printMetrics, registerMetrics } = prometheus();

//inbuilt middleware
app.use(logger())
app.use('/api/*', cors()) //enable cors for all routes
app.use(csrf()) //enable csrf for all routes : prevents CSRF attacks by checking request headers.
app.use(prettyJSON()) // ie //GET /api/user?pretty    [pretty print json response]
app.use(trimTrailingSlash()) //removes trailing slash from the url ie //GET /api/user/  => /api/user

//3rd party middleware
app.use('*', registerMetrics) //register metrics for all routes


//default routes
app.get('/metrics', printMetrics) //GET /metrics  => prometheus metrics
app.get('/ok', (c) => c.text("API is running healthy", 200))
app.notFound((c) => {
  return c.text('Route not found💀', 404)
})

// custom routes
app.route('/users', user)


serve({
  fetch: app.fetch,
  port: Number(process.env.PORT || 3000)
})

console.log(`Server running on port ${process.env.PORT || 3000}`)



