import {z} from "zod"
import {createRoomSchema,addRoomSchema} from "../schemas/roomschema"

export type CreateRoomRequest = z.infer<typeof createRoomSchema>
export type AddRoomRequest = z.infer<typeof addRoomSchema>

