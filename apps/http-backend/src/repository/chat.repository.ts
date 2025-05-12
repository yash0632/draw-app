import client from "@repo/db/prismaclient";
export async function GetChatsFromDb(roomId:number){
    try{    
        const chats = await client.chat.findMany({
            where:{
                roomId
            },
            orderBy:{
                id:"desc"
            },
            take:50
        });
        return chats;
    }catch(err){
        throw err;
    }
}

