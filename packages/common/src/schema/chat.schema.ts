import z from 'zod'

export const chatSchema = z.object({
    params:z.object({
        roomId:z.string()
    })
})