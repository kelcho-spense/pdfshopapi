import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { listProfiles, getProfile, createProfile } from './profile.controller'
import { profileSchema } from '../validators'

const profile = new Hono()

profile.get('/v1/', listProfiles)  // GET /user
profile.get('/v1/:id', getProfile)   // GET /user/:id
profile.post('/v1/', zValidator('json', profileSchema, (result, c) => {
    if (!result.success) return c.json(result.error, 400)
}), createProfile) // POST /user

export default profile