
import axios from 'axios';
import { BACKEND_URL } from '@/config';


import { Canvas } from '@/components/Canvas';

export default async function RoomPage(
    {params}:{
        params:Promise<{
            slug:string
        }>
    }
){
   
    const slug = (await params).slug;
    
    const roomId = await getRoomId(slug);
    console.log("roomId",roomId);
    return(<Canvas roomId={roomId}/>)

}

async function getRoomId(slug:string){
    
    const res = await axios.get(`${BACKEND_URL}/room/${slug}`,{
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("token")
        }
    })
    if(res.data && res.data.roomId != null){
        const roomId = res.data.roomId as number;
        return roomId;
    }
    
    throw new Error("Room not found");
}

