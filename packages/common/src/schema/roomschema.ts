import {z} from "zod"

export const createRoomSchema = z.object({
    body:z.object({
        roomName: z.string(),
        email:z.string().email()
    })
})

export const addRoomSchema = z.object({
    body:z.object({
        roomId: z.number(),
        email:z.string().email()
    })
})

export const deleteRoomMemberSchema = z.object({
    body:z.object({
        roomId: z.number(),
        email:z.string().email()
    })
})

