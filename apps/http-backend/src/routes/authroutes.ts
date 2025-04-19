import express,{Request,Response } from "express";
import {signupSchema,signinSchema} from "@repo/common/schema/userschema";
import AuthControllerInstance from "../controllers/authcontroller";


const router:express.Router = express.Router();



//@ts-ignore
router.post('/register',async(req:Request,res:Response)=>{
    const response = signupSchema.safeParse(req.body);
    if(!response.success){
        return res.status(400).json({
            error:response.error.issues
        })
    }
    try{
        await AuthControllerInstance.register(req,res);
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            error:error
        })
    }
})

//@ts-ignore
router.post('/signin',async(req:Request,res:Response)=>{
    const response = signinSchema.safeParse(req.body);
    if(!response.success){
        return res.status(400).json({
            error:response.error.issues
        })
    }
    try{
        await AuthControllerInstance.login(req,res);
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            error:error
        })
    }
})



export default router;