import {z} from 'zod'

import {createRoomSchema,addRoomSchema,deleteRoomMemberSchema} from '../schema/roomschema'

export type CreateRoomType = z.infer<typeof createRoomSchema>
export type AddRoomMemberType = z.infer<typeof addRoomSchema>
export type DeleteRoomMemberType = z.infer<typeof deleteRoomMemberSchema>