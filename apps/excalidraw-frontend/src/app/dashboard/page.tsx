"use client"
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { useRouter } from "next/navigation";


export default function DashBoardPage(){
    const [createRoomName,setCreateRoomName] = useState("");
    const [joinRoomName,setJoinRoomName] = useState("");
    const router = useRouter();

    function createRoomFunc(){
        axios.post(`${BACKEND_URL}/room/create`,{slug:createRoomName},{
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("token")
            }
        }).then(response=>{
            const data = response.data;
            router.push(`/room/${data.slug}`);
        }).catch((err)=>{
            console.log(err);
        })
    }

    function joinRoomFunc(){
        axios.get(`${BACKEND_URL}/room/${joinRoomName}`,{headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("token")
        }}).then(()=>{
            router.push(`/room/${joinRoomName}`);
        })
        .catch((err)=>{
            console.log(err);
        })
        
    }


    return(
        <div className="w-screen h-screen flex justify-center items-center bg-white text-black">
            <div className="w-1/2">
                <div className="flex justify-around">
                    <div className="flex flex-col p-2 gap-2 border-1 border-neutral-800 rounded-md">
                        <div className="p-2 mx-auto text-center font-semibold">CREATE ROOM</div>
                        <input onChange={(e)=>setCreateRoomName(e.target.value)} className="p-2 bg-neutral-700 rounded-md text-white outline-none ring-0" type="text" placeholder="Room Name" value={createRoomName}/>
                        <button className="p-2 bg-black rounded-md text-white outline-none ring-0 cursor-pointer" onClick={createRoomFunc}>Create</button>
                    </div>
                    
                    <div className="flex flex-col p-2 gap-2 border-1 border-neutral-800 rounded-md">
                        <div className="p-2 mx-auto text-center font-semibold">JOIN ROOM</div>
                        <input onChange={(e)=>{setJoinRoomName(e.target.value)}} className="p-2 bg-neutral-700 rounded-md text-white outline-none ring-0" type="text" placeholder="Room Name" value={joinRoomName} />

                        <button className="p-2 bg-black rounded-md text-white outline-none ring-0 cursor-pointer" onClick={joinRoomFunc}>Join</button>
                    </div>
                </div>

            </div>
        </div>
    )
}