"use client"

import { initDraw } from "@/draw";
import { useEffect, useRef } from "react";

export function Canvas({roomId}:{roomId:number}){
    const canvasRef = useRef<HTMLCanvasElement>(null)
    
    
    useEffect(()=>{
        if(canvasRef.current){
            
            
            const canvas = canvasRef.current;
            
                initDraw(canvas,roomId.toString());
            
            
        }
    },[])


    return(
        <div>
            <canvas ref={canvasRef} width={1500} height={1500}></canvas>
        </div> 
    )
}