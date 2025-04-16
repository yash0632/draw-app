
import {signupSchema} from "../schemas/authschema"
import z from "zod"

export type signUpType = z.infer<typeof signupSchema>
