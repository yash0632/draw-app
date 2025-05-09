import express,{Request,Response } from "express";
import {signupSchema,signinSchema} from "@repo/common/schema/userschema";
import UserControllerInstance from "../controllers/usercontroller";
import validate from "../utils/validate";


const router:express.Router = express.Router();




router.post('/register',validate(signupSchema),UserControllerInstance.register)

router.post('/signin',validate(signinSchema),UserControllerInstance.login)



export default router;