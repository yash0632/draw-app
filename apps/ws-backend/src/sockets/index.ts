import {Server} from 'http'
import { WebSocketServer,WebSocket } from 'ws'
import logger from '@repo/backend-common/logger'
import { jwtMiddleWareFunc } from '../middleware/auth'

export default function configureSocketServer(server: Server){
    const wss:WebSocketServer = new WebSocketServer({noServer:true})

    server.on('upgrade',(request,socket,head)=>{

        socket.on("error",onSocketPreError)

        //Perform Authorization
        if(!jwtMiddleWareFunc(request)){
            logger.error("Error in Authorization")
            socket.destroy()
        }
        socket.removeListener("error",onSocketError)
        
        wss.handleUpgrade(request,socket,head,(ws)=>{
            wss.emit('connection',ws,request)
        })
    })


    wss.on('connection',(ws:WebSocket,req)=>{
        ws.on('message',(message:Buffer,isBinary)=>{
            wss.clients.forEach((client)=>{
                if(client !== ws && client.readyState === WebSocket.OPEN){
                    client.send(message,{binary:isBinary});
                }
            })
        })

        ws.on('close',()=>{
            logger.info("Client Disconnected")
        })
        ws.on('error',onSocketError)
    })

}

function onSocketError(e:Error){
    logger.error(e)
}

