import { GetChatsFromDb } from "../repository/chat.repository";

export async function GetChatsFromService(roomId:number){
    try{
        const chats =await GetChatsFromDb(roomId);
        return chats;
    }catch(err){
        throw err;
    }
    
}