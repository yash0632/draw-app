import {Request,Response} from "express"
import crypto from "crypto"
import AuthServicesInstance from "../services/authservices"

class AuthController{
    static instance:AuthController

    private constructor(){}

    static getInstance(){
        if(!AuthController.instance){
            AuthController.instance = new AuthController();
        }
        return AuthController.instance;
    }

    register = async(request:Request,res:Response)=>{
        try{
            const {username,email,password} = request.body;

            const token = await AuthServicesInstance.registerUser(username,email,password);

            return res.status(200).json({
                message:"User registered successfully",
                token
            })
        }
        catch(error){
            return res.status(500).json({
                error:error
            })
        }
    }


    login=async(req:Request,res:Response)=>{
        try{
            const{email,password} = req.body;

            const token = await AuthServicesInstance.loginUser(email,password);

            return res.status(200).json({
                message:"User logged in successfully",
                token
            })
        }catch(error){
            res.json({
                error:error
            })
        }
    }
}

export default AuthController.getInstance();
