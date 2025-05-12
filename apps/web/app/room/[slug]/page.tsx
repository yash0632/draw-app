"use client"

import axios from "axios"
import { BACKEND_URL } from "../../config";
import { useEffect, useState } from "react";
import { ChatRoom } from "../../../components/ChatRoom";
import { useParams } from "next/navigation";

interface chatRoomPageProps{
    params:{
        slug:string
    }
}

export default function ChatRoomPage({params}:chatRoomPageProps){
    
    const slug =params.slug
    const [loading,setLoading] = useState(true);
    const[roomId,setRoomId] = useState<number|null>(null);
    
    useEffect(()=>{
        if(slug){
            console.log("slug",slug);
            getRoomId(slug).then(roomId=>{
                setRoomId(roomId);
                setLoading(false);
            });
        }
        
    },[slug,loading])

    let content :React.ReactNode = null;

    if(!loading){
        content = (
            <div>
                <ChatRoom id={roomId as number}/>
            </div>
        )
    }
    else{
        content = (
            <div>
                Loading...
            </div>
        )
    }
    
    return(
        <div>
            {content}
        </div>
    )
}

export async function getRoomId(slug:string){
    const response =await axios.get(`${BACKEND_URL}/room/${slug}`,{
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("token")
        } 
    })
    const data = response.data as {roomId:number}
    console.log(response.data);
    return data.roomId;
}