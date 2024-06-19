import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { listUsers, getUser, createUser, deleteUser } from './user.controller'
import { userSchema } from '../validators'
import { insertUserSchema } from '../drizzle/schema'

const user = new Hono()

user.get('/', listUsers)  // GET /user
user.get('/:id', getUser)   // GET /user/:id
user.post('/', zValidator('json', insertUserSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createUser) // POST /user
user.delete('/:id', deleteUser) // DELETE /user/:id)


export default user



