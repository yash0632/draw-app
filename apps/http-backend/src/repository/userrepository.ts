import client from "@repo/db/src/client";
class UserRepository{
    static instance :UserRepository
    private constructor(){}

    static getInstance(){
        if(!UserRepository.instance){
            UserRepository.instance = new UserRepository();
        }
        return UserRepository.instance;
}

    createUser=async(username:string,email:string,hashPassword:string)=>{
        try{
            const user = await client.users.create({
                data:{
                    username,
                    email,
                    hashPassword
                }
            })
            return user;
        }
        catch(err){
            throw err;
        }
    }

    getUser = async(email:string)=>{
        try{
            const user = await client.users.findFirst({
                where:{
                    email
                }
            })
            return user;
        }
        catch(error){
            throw error;
        }
    }

}

export default UserRepository.getInstance();