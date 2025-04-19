import {z} from 'zod'
import {signupSchema, signinSchema} from '../schema/userschema'


export type SignUpType = z.infer<typeof signupSchema>
export type SignInType = z.infer<typeof signinSchema>