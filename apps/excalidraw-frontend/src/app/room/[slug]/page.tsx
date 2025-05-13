"use client"

import { useEffect, useRef } from 'react';

export default function RoomPage(){
   

    const canvasRef = useRef<HTMLCanvasElement>(null)
    
    
    useEffect(()=>{
        if(canvasRef.current){
            
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            if(!ctx){
                return;
            }
            let clicked = false;
            let startX = 0;
            let startY = 0;

            
            canvas.addEventListener("mousedown",(e)=>{
                clicked = true;
                startX = e.clientX;
                startY = e.clientY;
            })

            canvas.addEventListener("mouseup",(e)=>{
                clicked = false;
                
            })
            
            canvas.addEventListener("mousemove",(e)=>{
                if(clicked){
                    const width = e.clientX - startX;
                    const heigth = e.clientY - startY;
                    console.log(width,heigth);
                    ctx.clearRect(0,0,canvas.width,canvas.height);
                    ctx.strokeRect(startX,startY,width,heigth);
                }
                
            })
            
        }
    },[])
    

    

    return(
        <div className="w-screen h-screen flex justify-center items-center bg-white">
            <canvas ref={canvasRef} width={500} height={500}></canvas>
        </div> 
    )


   
}