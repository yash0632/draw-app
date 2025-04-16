import {WebSocketServer} from "ws"
import dotenv from "dotenv"
dotenv.config()

const port = Number(process.env.PORT) || 8080

const wss = new WebSocketServer({port})

wss.on('connection',function connection(ws){
    ws.on('error',console.error);

    ws.on('message',function message(data){
        wss.clients.forEach(function each(client){
            if(client !== ws && client.readyState === WebSocket.OPEN){
                client.send(data)
            }
        })
    })

    ws.send('something')
})