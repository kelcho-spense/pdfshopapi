import { z } from 'zod'

export const userSchema = z.object({
  fullname: z.string(),
  address: z.string(),
  score: z.number(),
})

export const profileSchema = z.object({
  userId: z.number(),
  bio: z.string(),
})