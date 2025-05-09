import { AnyZodObject } from "zod";
import {Request,Response,NextFunction} from 'express'


const validate = (schema: AnyZodObject) => (req:Request,res:Response,next:NextFunction)=>{
    try{
        schema.parse({
            body:req.body,
            query:req.query,
            params:req.params
        })
        next();
    }
    catch(err){
        
        res.status(400).json({error:err})
    }
}

export default validate;