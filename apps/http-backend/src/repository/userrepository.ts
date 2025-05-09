import client from "@repo/db/prismaclient";
class UserRepository{
    static instance :UserRepository
    private constructor(){}

    static getInstance(){
        if(!UserRepository.instance){
            UserRepository.instance = new UserRepository();
        }
        return UserRepository.instance;
}

    createUser=async(username:string,email:string,hashPassword:string,avatarPhoto:string|undefined)=>{
        try{
            const user = await client.user.create({
                data:{
                    username,
                    email,
                    hashPassword,
                    avatarPhoto
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
            const user = await client.user.findFirst({
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