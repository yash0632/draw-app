import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";

export default function ChatRoomClient({
    messages,
    id
}:{
    messages:{message:string,id:number}[],
    id:string
}){
    const {socket,loading} = useSocket();
    const [chats,setChats] = useState(messages);
    const [currentMessage,setCurrentMessage] = useState("");
    console.log("chats in page:",chats)

    useEffect(()=>{
        if(socket && !loading && socket.readyState === WebSocket.OPEN){
            socket.send(JSON.stringify({
                type:"join_room",
                data:{
                    roomId:parseInt(id)
                }
            }))

            socket.onmessage = (event) => {
                const parsedData = JSON.parse(event.data);
                if(parsedData.type === "chat"){
                    setChats((messages) => [...messages,parsedData.data.message]);
                }
            }

            
        }
    },[socket,loading,id])

    return(
        <div>
            {chats.map((chat,index)=>(
                <div key={chat.id}>
                    {chat.message}
                </div>
            ))}
            <input type="text" value={currentMessage}
            onChange={(e)=>setCurrentMessage(e.target.value)}
            ></input>
            <button onClick={()=>{
                socket?.send(JSON.stringify({
                    type:"chat",
                    data:{
                        roomId:parseInt(id),
                        message:currentMessage
                    }
                }))
                setChats((messages) => [...messages,{message:currentMessage,id:chats.length+1}]);
            }}>Send Message</button>
        </div>
    )
}