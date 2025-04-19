import {IncomingMessage, Server} from 'http'
import { jwtMiddleWareFunc } from '../auth/auth'
import { WebSocketServer,WebSocket } from 'ws';

const HEARTBEAT_INTERVAL = 5*1000;
const HEARTBEAT_VALUE = 1;

function sendHeartbeat(client:WebSocket){
    client.send(HEARTBEAT_VALUE,{binary:true})
    //TO BE DELETED
    console.log("Firing Intervals");
}


export default function configureSockets(server:Server){
    const wss = new WebSocketServer({noServer:true});


    wss.on('connection',(ws:WebSocket)=>{
        ws.isAlive = true;
        ws.on('error',()=>{
            ws.terminate();
            console.log("WebSocket connection closed") //TO BE DELETED
        })

        ws.on('close',()=>{
            console.log("WebSocket connection closed") //TO BE DELETED
        })

        ws.on('message',(message,isBinary)=>{
            if(isBinary && (message as any)[0] === HEARTBEAT_VALUE){
                ws.isAlive = true
                console.log("pong") //TO BE DELETED
            }
            wss.clients.forEach((client)=>{
                if(client.readyState === WebSocket.OPEN && client !== ws){
                    client.send(message,{binary:isBinary})
                }
            })
        })

        console.log('WebSocket connection opened') //TO BE DELETED
    })

    const interval = setInterval(()=>{
        wss.clients.forEach((client:WebSocket)=>{
            if(!client.isAlive){
                client.terminate();
            }
            client.isAlive = false;
            sendHeartbeat(client);

        })
    },HEARTBEAT_INTERVAL);

    server.on('upgrade',(request:IncomingMessage,socket,head)=>{
        //authentication //TO BE DELETED
        if(!jwtMiddleWareFunc(request)){
            socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
            socket.destroy();
            return;
        }
        
        wss.handleUpgrade(request,socket,head,(ws)=>{
            wss.emit('connection',ws)
        })

    })
}