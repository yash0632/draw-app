import jwt from 'jsonwebtoken'
import dotenv from "dotenv"
import {Request,Response,NextFunction} from "express"

import {JWT_SECRET} from "@repo/backend-common/config"

//Jwt verify and jwt sign

export const jwtSignFunc = (payload:Object,options?:jwt.SignOptions):string=>{
    const token =jwt.sign(payload,JWT_SECRET,{
        ...options,
        expiresIn:"15m"
    })
    return token
}

export const jwtMiddleWareFunc=(req:Request,res:Response,next:NextFunction)=>{
    const authorizationHeader = req.headers['authorization']
    if(!authorizationHeader){
        res.status(401).json({
            message:"Unauthorized"
        })
        return;
    }
    const token = authorizationHeader.split(' ')[1]
    if(!token){
        res.status(401).json({
            message:"Unauthorized"
        })
        return;
    }
    try{
        jwt.verify(token,JWT_SECRET,(err,decoded)=>{
            if(err){
                return res.json({
                    message:"Unauthorized"
                })
            }
            req.email = (decoded as {email:string}).email;
            next();
        })
    }
    catch(err){
       res.json({
            message:"Unauthorized"
        })
        return;
    }
}

