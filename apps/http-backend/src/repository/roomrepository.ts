import client from "@repo/db/src/client";

class RoomRepository{
    static instance : RoomRepository;
    private constructor(){}

    static getInstance(){
        if(!RoomRepository.instance){
            RoomRepository.instance = new RoomRepository();
        }
        return RoomRepository.instance;
    }

    createRoom = async(roomName:string,userId:number)=>{
        try{
            const room = await client.rooms.create({
                data:{
                    roomName:roomName,
                    ownerId:userId,
                    roomMembers:{
                        connect:{
                            id:userId
                        }
                    }
                }
            })
            return room;
        }
        catch(err){
            throw err;
        }
    }

    addRoomMember = async(roomId:number,userId:number)=>{
        try{
            const room =await client.rooms.update({
                where:{
                    id:roomId,
                },
                data:{
                    roomMembers:{
                        connect:{
                            id:userId
                        }
                    }
                }
            })
            return room;
        }
        catch(error){
            throw error
        }
    }

    getRoomId = async(roomName:string)=>{
        try{
            const room = await client.rooms.findFirst({
                where:{
                    roomName:roomName
                }
            })
            if(!room){
                throw new Error("Room not found");
            }
            return room.id;
        }
        catch(error){
            throw error
        }
    }
}

export default RoomRepository.getInstance()