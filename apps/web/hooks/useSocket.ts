import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";

export function useSocket(){
    const [loading,setLoading] = useState(true)
    const [socket,setSocket] = useState<WebSocket>()

    useEffect(()=>{
        const ws = new WebSocket(`${WS_URL}?token=${window.localStorage.getItem("token")}`)
        
        ws.onopen=()=>{
            setLoading(false);
            setSocket(ws);
        }

        return ()=>{
            if(ws.readyState === WebSocket.OPEN) ws.close();
        };
    },[])

    return{
        socket,
        loading
    }
}