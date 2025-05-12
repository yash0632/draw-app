import {z} from "zod"

export const createRoomSchema = z.object({
    body:z.object({
        slug: z.string(),
        email:z.string().email()
    })
})

export const GetRoomIdSchema = z.object({
    params:z.object({
        slug:z.string()
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

