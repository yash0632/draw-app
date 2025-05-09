import jwt from 'jsonwebtoken'

import {Request,Response,NextFunction} from "express"


import http, { IncomingMessage } from 'http'
import {JWT_SECRET} from "@repo/backend-common/config"



//Jwt verify and jwt sign

export const jwtSignFunc = (email:string):string=>{
    const token =jwt.sign({email},JWT_SECRET,{
        expiresIn:"24h"
    })
    return token
}

export const jwtMiddleWareFunc=(req:IncomingMessage)=>{
    const authorizationHeader = req.headers['authorization']
    if(!authorizationHeader){
        return false;
    }
    const token = authorizationHeader.split(' ')[1]
    if(!token){
        return false;
    }
    try{
        const decoded = jwt.verify(token,JWT_SECRET) as {email:string}
        req.email = decoded.email
        return true
    }
    catch(err){
        
        return false;
    }
}

