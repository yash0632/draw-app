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

    createRoom = async(roomName:string,email:string)=>{
        try{
            const user = await UserRepositoryInstance.getUser(email)
            if(!user){
                throw new Error("User not found");
            }
            const userId = user.id;
            const room = await RoomRepositoryInstance.createRoom(roomName,userId);
            return {roomId:room.id};
        }
        catch(err){
            throw err;
        }
    }


    addRoomMember = async(roomName:string,email:string)=>{
        try{
            const user = await UserRepositoryInstance.getUser(email);
            if(!user){
                throw new Error("User not found");
            }
            const userId = user.id;
            const roomId = await RoomRepositoryInstance.getRoomId(roomName);
            const room = await RoomRepositoryInstance.addRoomMember(roomId,userId);
            return {roomId:room.id};
        }
        catch(err){
            throw err;
        }
    }
}

export default RoomService.getInstance();