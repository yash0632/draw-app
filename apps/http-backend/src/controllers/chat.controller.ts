import {Request,Response} from 'express'
import { GetChatsFromService } from '../services/chat.services';
import { chatType } from '@repo/common/types/chattype';

class ChatController{

    private static instance:ChatController

    private constructor(){}

    static getInstance(){
        if(!ChatController.instance){
            ChatController.instance = new ChatController();
        }
        return ChatController.instance;
    }

    GetChats = async (req:Request<chatType['params'],{},{}>,res:Response)=>{
        try{
            const roomId = req.params.roomId;

            

            const chats =await  GetChatsFromService(parseInt(roomId));

            res.status(200).json({
                chats:chats
            })
            return;
        }catch(err){
            res.json({
                message:"Internal Server Error"
            })
            throw err;
        }
    }
}

export default ChatController.getInstance();