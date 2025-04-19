import {z} from 'zod'

import {createRoomSchema,addRoomSchema} from '../schema/roomschema'

export type CreateRoomType = z.infer<typeof createRoomSchema>
export type AddRoomType = z.infer<typeof addRoomSchema>