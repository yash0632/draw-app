import { WebSocket } from "ws";

export interface User{
    ws:WebSocket,
    rooms:number[],
    userId:string
}