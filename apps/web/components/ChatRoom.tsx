import axios from "axios"
import { BACKEND_URL } from "../app/config"
import { useEffect, useState } from "react";
import ChatRoomClient from "./ChatRoomClient";
import { devNull } from "node:os";

export function ChatRoom({id}:{
    id:number
}){
    const[chats,setChats] = useState(null);
    useEffect(()=>{
        getChats(id.toString()).then(data=>{
            console.log(data);
            setChats(data.chats);
        })
    },[])

    let content:React.ReactNode = null;
    if(chats){
        content = (
            <ChatRoomClient messages={chats} id={id.toString()}/>
        )
    }
    else{
        content = (
            <div>Loading...</div>
        )
    }

    return(
        <div>
            {content}
        </div>
    )
    
}

async function getChats(roomId:string){
    const response = await axios.get(`${BACKEND_URL}/chats/${roomId}`,{
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("token")
        }
    })
    const data = response.data;
    return data;
}
