import UserRepositoryInstance from "../repository/userrepository";
import RoomRepositoryInstance from "../repository/roomrepository";
class RoomService{
    static instance : RoomService;
    private constructor(){}

    static getInstance(){
        if(!RoomService.instance){
            RoomService.instance = new RoomService();
        }
        return RoomService.instance;
    }

    createRoom = async(slug:string,email:string)=>{
        try{
            const user = await UserRepositoryInstance.getUser(email)
            if(!user){
                throw new Error("User not found");
            }
            const userId = user.id;
            const room = await RoomRepositoryInstance.createRoom(slug,userId);
            return {roomId:room.id};
        }
        catch(err){
            throw err;
        }
    }


    // addRoomMember = async(roomId:number,email:string)=>{
    //     try{
    //         const user = await UserRepositoryInstance.getUser(email);
    //         if(!user){
    //             throw new Error("User not found");
    //         }
    //         const userId = user.id;
    //         const room = await RoomRepositoryInstance.addRoomMember(roomId,userId);
            
    //         return {room:room};
    //     }
    //     catch(err){
    //         throw err;
    //     }
    // }

    // removeRoomMember = async(roomId:number,email:string)=>{
    //     try{
    //         const user = await UserRepositoryInstance.getUser(email);
    //         if(!user){
    //             throw new Error("User not found");
    //         }
            
    //         if(roomId !== user.roomId){
    //             throw new Error("User is not a room member");
    //         }
    //         const room =await RoomRepositoryInstance.removeRoomMember(roomId,user.id);
    //         return {room:room};
    //     }
    //     catch(error){
    //         throw error;
    //     }
    // }
}

export default RoomService.getInstance();