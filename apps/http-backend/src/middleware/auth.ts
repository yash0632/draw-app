import jwt from 'jsonwebtoken'
import dotenv from "dotenv"
import {Request,Response,NextFunction} from "express"

import {JWT_SECRET} from "@repo/backend-common/config"

//Jwt verify and jwt sign

export const jwtSignFunc = (payload:Object,options?:jwt.SignOptions):string=>{
    const token =jwt.sign(payload,JWT_SECRET,{
        ...options,
        expiresIn:"24h"
    })
    return token
}

export const jwtMiddleWareFunc=(req:Request,res:Response,next:NextFunction)=>{
    const authorizationHeader = req.headers['authorization']
    if(!authorizationHeader){
        console.log("no auth header")
        res.status(401).json({
            message:"Unauthorized"
        })
        return;
    }
    const token = authorizationHeader.split(' ')[1]
    if(!token){
         console.log("no auth header 2")
        res.status(401).json({
            message:"Unauthorized"
        })
        return;
    }
    try{
        jwt.verify(token,JWT_SECRET,(err,decoded)=>{
            if(err){
                 console.log("no auth header 3")
                return res.json({
                    message:"Unauthorized"
                })
            }
            if(typeof decoded == "string" || !decoded){
                throw new Error("Invalid decoded object")
            }
            
            if(req.body){
                req.body.email = decoded.email;
            }
            
            
            next();
        })
    }
    catch(err:any){
        console.log("no auth header 4")
        res.json({
            error:err.message,
            message:"Unauthorized"
        })
        return;
    }
}

