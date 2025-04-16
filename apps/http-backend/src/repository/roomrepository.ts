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

    addRoomMember = async(roomName:string)=>{

    }

    getRoomId = async(roomName:string)=>{
        
    }
}

export default RoomRepository.getInstance()