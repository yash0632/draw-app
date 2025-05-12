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

export const checkUser=(token:string|null)=>{
    if(!token ){
        return false;
    }
    
    try{
        const decoded = jwt.verify(token,JWT_SECRET)
        if(typeof decoded == "string"){
            return null
        }

        if(!decoded || !decoded.userId){
            return null
        }
        return decoded.userId;
    }
    catch(err){
        
        return null;
    }
}

