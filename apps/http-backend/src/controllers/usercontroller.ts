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

    register = async(request:Request<{},{},SignUpType>,res:Response)=>{
        try{
            const {username,email,password} = request.body;

            const token = await AuthServicesInstance.registerUser(username,email,password);

            res.status(200).json({
                message:"User registered successfully",
                token
            })
            return;
        }
        catch(error){
            res.status(500).json({
                error:error
            })
            return;
        }
    }


    login=async(req:Request<{},{},SignInType>,res:Response)=>{
        try{
            const{email,password} = req.body;

            const token = await AuthServicesInstance.loginUser(email,password);

            res.status(200).json({
                message:"User logged in successfully",
                token
            })
            return 
        }catch(error){
            res.json({
                error:error
            })
            return 
        }
    }
}

export default UserController.getInstance();
