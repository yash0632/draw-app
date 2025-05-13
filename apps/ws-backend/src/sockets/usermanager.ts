import { User } from "../types/usermanager.types";
import { WebSocket } from "ws";
import client from "@repo/db/prismaclient";
import { IRedisManager } from "./redismanager";


const UserManager:User[] = []

class UserManagerClass{
    private static instance:UserManagerClass;
    #users:User[]
    #redisManager:any
    

    private constructor(){
        this.#users = [];
        this.#redisManager = null
    }

    static getInstance(){
        if(!UserManagerClass.instance){
            UserManagerClass.instance = new UserManagerClass();
        }
        return UserManagerClass.instance;
    }

    addQueueManager=(redismanager:IRedisManager)=>{
        this.#redisManager = redismanager
    }

    addUserToManager=(user:User)=>{
        this.#users.push(user)
        
    }

    addUserToRoom=async({ws,roomId}:{
        ws:WebSocket,
        roomId:number
    })=>{
        const user = this.#users.find((user:User)=>user.ws===ws)
        if(user == undefined){
            return;
        }
        const room = await client.room.findFirst({where:{id:roomId}})
        if(!room){
            return
        }
        const roomInUser = user.rooms.find(id => id === roomId);
        if(roomInUser){
            return;
        }
        user.rooms.push(roomId);
        
    }

    removeRoomFromUser=async({
        ws,roomId
    }:{
        ws:WebSocket,
        roomId:number
    })=>{
        const user = this.#users.find(user=>user.ws == ws);
        if(user == undefined){
            return;
        }
        const room = await client.room.findFirst({where:{id:roomId}});
        if(!room){
            return;
        }
        user.rooms = user.rooms.filter(id => id !== roomId)
        return;
    }

    sendChatToRoom=async({
        ws,
        chat,
        roomId
    }:{
        ws:WebSocket,
        chat:string,
        roomId:number
    })=>{
        const user = this.#users.find(user=>user.ws == ws);
        if(user == undefined){
            return;
        }
        
        const room = await client.room.findFirst({where:{id:roomId}});
        if(!room){
            return;
        }
        
        console.log(user.rooms);
        const roomInUser = user.rooms.find(id => id === roomId);
        if(!roomInUser){
            return;
        }
        
        const userInRooms = this.#users.filter(user => user.rooms.includes(roomId));
        
        userInRooms.forEach(user => {
            if(user.ws != ws && user.ws.readyState === WebSocket.OPEN){
                user.ws.send(JSON.stringify({type:"chat",data:{message:chat,roomId}}))
            }
        })

        
        this.#redisManager.addJobsToQueue('chat',{
            chat,
            roomId,
            userId:user.userId
        });
         
    }


}

export default UserManagerClass.getInstance()