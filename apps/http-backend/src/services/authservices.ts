import { jwtSignFunc } from "../auth/auth";
import hashPasswordFunc from "../libs/hash";

import UserRepositoryInstance from "../repository/userrepository";

class AuthServices{
    static instance : AuthServices;
    
    private constructor() {
        
    }

    static getInstance(){
        if(!AuthServices.instance){
            AuthServices.instance = new AuthServices();
        }
        return AuthServices.instance;
    }

    registerUser=async(username:string,email:string,password:string)=>{
        const hashPassword = hashPasswordFunc(password);
        try{
            UserRepositoryInstance.createUser(username,email,hashPassword);
            
            const token = jwtSignFunc(email);
            
            return token
        }
        catch(err){
            throw err;
        }
        
    }

    loginUser = async(email:string,password:string)=>{
        try{
            const user = await UserRepositoryInstance.getUser(email)
            if(!user){
                throw new Error("User not found");
            }
            const userDbHashPassword = user.hashPassword;
            const hashPassword = hashPasswordFunc(password);
            if(hashPassword != userDbHashPassword){
                throw new Error('Invalid password')
            }
            const token = jwtSignFunc(email);
            return token;
        }
        catch(error){
            throw error;
        }
    }
}

export default AuthServices.getInstance();