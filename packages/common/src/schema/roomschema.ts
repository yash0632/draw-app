import {z} from "zod"

export const createRoomSchema = z.object({
    roomName:z.string()
})

export const addRoomSchema = z.object({
    roomName:z.string()
})

