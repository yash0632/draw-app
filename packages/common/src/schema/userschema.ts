import {z} from "zod"

export const signupSchema = z.object({
    body:z.object({
        username:z.string(),
        email:z.string().email(),
        password:z.string(),
    })
    
})

export const signinSchema = z.object({
    body:z.object({
        email:z.string().email(),
        password:z.string(),
    })
})