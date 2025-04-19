import jwt from 'jsonwebtoken'
import dotenv from "dotenv"
import {Request,Response,NextFunction} from "express"

import {JWT_SECRET} from "@repo/backend-common/config"

//Jwt verify and jwt sign

export const jwtSignFunc = (email:string):string=>{
    const token =jwt.sign({email},JWT_SECRET,{
        expiresIn:"24h"
    })
    return token
}

export const jwtMiddleWareFunc=(req:Request,res:Response,next:NextFunction)=>{
    const authorizationHeader = req.headers['authorization']
    if(!authorizationHeader){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
    const token = authorizationHeader.split(' ')[1]
    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        })
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
        return res.json({
            message:"Unauthorized"
        })
    }
}

