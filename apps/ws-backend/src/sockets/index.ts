import {Server} from 'http'
import { WebSocketServer,WebSocket } from 'ws'
import logger from '@repo/backend-common/logger'
import { checkUser } from '../middleware/auth'
import { IncomingMessage } from 'http'
import UserManagerInstance from './usermanager'

export default function configureSocketServer(server: Server){
    const wss:WebSocketServer = new WebSocketServer({noServer:true})

    server.on('upgrade',(request,socket,head)=>{

        socket.on("error",onSocketError)

        //Perform Authorization
        const url = request.url
        if(!url) return
        const queryParams = new URLSearchParams(url.split('?')[1])
        const token = queryParams.get('token')
        const userId = checkUser(token)

        if(userId == null){
            logger.error("Error in Authorization")
            socket.destroy()
        }
        socket.removeListener("error",onSocketError)
        
        wss.handleUpgrade(request,socket,head,(ws)=>{
            wss.emit('connection',ws,request,userId as string)
        })
    })


    wss.on('connection',(ws:WebSocket,req:IncomingMessage,userId:string)=>{
        
            logger.info("Client Connected")
             
            
            UserManagerInstance.addUserToManager({
                ws:ws,
                userId,
                rooms:[]
            })

        

        ws.on('message',async(data)=>{
            const parsedData = JSON.parse(data as unknown as string)
            switch (parsedData.type){
                case "join_room":

                    await UserManagerInstance.addUserToRoom({ws,roomId:parsedData.data.roomId})
                    break;

                case "leave_room":

                    await UserManagerInstance.removeRoomFromUser({ws,roomId:parsedData.data.roomId})
                    break;

                case "chat":

                    await UserManagerInstance.sendChatToRoom({
                        ws,roomId:parsedData.data.roomId,chat:parsedData.data.message})
                    break;


                default:
                    break;
            }
        })

        ws.on('close',()=>{
            logger.info("Client Disconnected")
        })
        ws.on('error',onSocketError)
    })

}

function onSocketError(e:Error){
    console.log("code here")
    logger.error(e.message)
    return
}

