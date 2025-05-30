import {z} from 'zod'

import {createRoomSchema,addRoomSchema,deleteRoomMemberSchema,GetRoomIdSchema} from '../schema/roomschema'

export type CreateRoomType = z.infer<typeof createRoomSchema>
export type AddRoomMemberType = z.infer<typeof addRoomSchema>
export type DeleteRoomMemberType = z.infer<typeof deleteRoomMemberSchema>
export type GetRoomIdType = z.infer<typeof GetRoomIdSchema>