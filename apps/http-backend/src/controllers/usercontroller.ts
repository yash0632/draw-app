import {Request,Response} from "express"
import crypto from "crypto"
import AuthServicesInstance from "../services/userservices"
import { SignInType, SignUpType } from "@repo/common/types/usertype";

class UserController{
    static instance:UserController

    private constructor(){}

    static getInstance(){
        if(!UserController.instance){
            UserController.instance = new UserController();
        }
        return UserController.instance;
    }

    register = async(request:Request<{},{},SignUpType['body']>,res:Response)=>{
        try{
            const {username,email,password,avatarPhoto} = request.body;
            
            const token = await AuthServicesInstance.registerUser(username,email,password,avatarPhoto);

            res.status(200).json({
                message:"User registered successfully",
                token
            })
            return;
        }
        catch(error:any){
            res.status(500).json({
                error:error.message
            })
            return;
        }
    }


    login=async(req:Request<{},{},SignInType['body']>,res:Response)=>{
        try{
            const{email,password} = req.body;

            const token = await AuthServicesInstance.loginUser(email,password);

            res.status(200).json({
                message:"User logged in successfully",
                token
            })
            return 
        }catch(error:any){
            
            res.status(500).json({
                error:error.message
            })
            return 
        }
    }
}

export default UserController.getInstance();
