import { z } from 'zod'
import { type Context } from "hono";
import { allUsersService, createUserService, getUserService,deleteUserService } from "./user.service";
import { userSchema } from '../validators'
import { iUserSchema } from "../drizzle/schema";
export const listUsers = async (c: Context) => {
    const { q, limit } = c.req.query()
    const user = await allUsersService(q, Number(limit));
    return c.json(user, 200);
}
export const getUser = async (c: Context) => {
    const id = parseInt(c.req.param('id'))
    if (isNaN(id)) return c.text('Invalid id', 400)
    const user = await getUserService(id)
    if (!user) return c.json({error: 'User not found'}, 404)
    return c.json(user, 200)
}
export const createUser = async (c: Context) => {
    const data: iUserSchema = await c.req.json()
    const res = await createUserService(data)
    return c.json(res, 201)
}
export const deleteUser = async (c: Context) => {
    const id = parseInt(c.req.param('id'))
    if (isNaN(id)) return c.text('Invalid id', 400)
    const res = await deleteUserService(id)
    if (!res) return c.text('User not found', 404)
    return c.json(res, 200)
}
