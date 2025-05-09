import client from "@repo/db/prismaclient";

class RoomRepository{
    static instance : RoomRepository;
    private constructor(){}

    static getInstance(){
        if(!RoomRepository.instance){
            RoomRepository.instance = new RoomRepository();
        }
        return RoomRepository.instance;
    }

    createRoom = async(slug:string,userId:string)=>{
        try{
            const room = await client.room.create({
                data:{
                    slug:slug,
                    adminId:userId,
                    
                }
            })
            return room;
        }
        catch(err){
            throw err;
        }
    }

    // addRoomMember = async(roomId:number,userId:number)=>{
    //     try{
    //         const room =await client.room.update({
    //             where:{
    //                 id:roomId,
    //             },
    //             data:{
    //                 roomMembers:{
    //                     connect:{
    //                         id:userId
    //                     }
    //                 }
    //             }
    //         })
    //         return room;
    //     }
    //     catch(error){
    //         throw error
    //     }
    // }

    getRoomId = async(slug:string)=>{
        try{
            const room = await client.room.findFirst({
                where:{
                    slug:slug
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

    // removeRoomMember =async (roomId:number,userId:number)=>{
    //     try{
    //         const room =await client.room.update({
    //             where:{
    //                 id:roomId
    //             },
    //             data:{
    //                 roomMembers:{
    //                     disconnect:{
    //                         id:userId
    //                     }
    //                 }
    //             }
    //         })
    //         return room;
    //     }
    //     catch(error){
    //         throw error
    //     }
    // }
}

export default RoomRepository.getInstance()