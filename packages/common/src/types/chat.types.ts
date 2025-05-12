import z from 'zod'
import { chatSchema } from '../schema/chat.schema'

export type chatType = z.infer<typeof chatSchema>