
import express from "express"
import dotenv from "dotenv"
import configureSockets from "./sockets"
dotenv.config()

const port = Number(process.env.PORT) || 8080

const app = express();

const server = app.listen((port),()=>{
    console.log("WebSocketServer started on port",port)
})


configureSockets(server);
console.log("Server started on port",port)
