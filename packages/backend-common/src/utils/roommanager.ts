import { RedisClientType,createClient } from "redis";

class RoomManager{
    
    static instance : RoomManager
    #client:RedisClientType
    private constructor(){
        this.#client = createClient({
            url:"redis://localhost:6379"
        });
    }

    static getInstance(){
        if(!RoomManager.instance){
            RoomManager.instance = new RoomManager();
            
        }
        return RoomManager.instance;
    }

    connectClient = async()=>{
        await this.#client.connect();
    }

    addRoomMember = async(roomId:number,userId:number)=>{
        this.#client.sAdd(roomId.toString(),userId.toString());
        return true;
    }

    isRoomMember = async(roomId:number,userId:number)=>{
        const isMember = await this.#client.sIsMember(roomId.toString(),userId.toString());
        return isMember;
    }

    removeRoomMember = async(roomId:number,userId:number)=>{
        const isMember = await this.isRoomMember(roomId,userId);
        if(!!isMember){
            this.#client.sRem(roomId.toString(),userId.toString());
            return "user removed";
        }
        else{
            return "user not found in room";
        }
        
    }

}

export default RoomManager.getInstance();