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
    

    useEffect(()=>{
        if(socket && !loading){
            
            if(socket.readyState === WebSocket.OPEN){
                socket.send(JSON.stringify({
                    type:"join_room",
                    data:{
                        roomId:parseInt(id)
                    }
                }))
            }
            else{
                socket.onopen = () => {
                    socket.send(JSON.stringify({
                        type:"join_room",
                        data:{
                            roomId:parseInt(id)
                        }
                    }))
                }
            }

            socket.onmessage = (event) => {
                console.log("message received")
                const parsedData = JSON.parse(event.data);
                console.log(parsedData);
                if(parsedData.type === "chat"){
                    
                    setChats((messages) => [...messages,{message:parsedData.data.message,id:chats.length+1}]);
                }
            }
            
            
        }
        
    },[socket,loading,id])

    return(
        <div>
            {chats.map((chat,index)=>(
                <div key={index}>
                    {chat.message}
                </div>
            ))}
            <input type="text" value={currentMessage}
            onChange={(e)=>setCurrentMessage(e.target.value)}
            ></input>
            <button onClick={()=>{
                if(socket && socket.readyState === WebSocket.OPEN) {
                    socket.send(JSON.stringify({
                        type:"chat",
                        data:{
                            roomId:parseInt(id),
                            message:currentMessage
                        }
                    }))
                }
                
                setChats((messages) => [...messages,{message:currentMessage,id:chats.length+1}]);
                setCurrentMessage("")
            }}>Send Message</button>
        </div>
    )
}