import {z} from "zod"

export const createRoomSchema = z.object({
    roomName: z.string()
})

export const addRoomSchema = z.object({
    roomId:z.number()
})

export const deleteRoomMemberSchema = z.object({
    roomId:z.number(),
})

