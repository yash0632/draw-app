"use client"

import { useEffect, useRef } from 'react';
import { initDraw } from '@/draw';

export default function RoomPage(){
   

    const canvasRef = useRef<HTMLCanvasElement>(null)
    
    
    useEffect(()=>{
        if(canvasRef.current){
            
            
            const canvas = canvasRef.current;
            initDraw(canvas);
        }
    },[])
    

    

    return(
        <div>
            <canvas ref={canvasRef} width={1500} height={1500}></canvas>
        </div> 
    )


   
}