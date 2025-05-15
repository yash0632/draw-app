import axios from "axios"
import { BACKEND_URL } from "@/config";

type Shape = {
    type: "rect";
    x:number;
    y:number;
    width:number;
    height:number;
} | {
    type:"circle",
    centerX:number;
    centerY:number;
    radius:number
}


export async function initDraw(canvas:HTMLCanvasElement,roomId:string){
    
    const ctx = canvas.getContext("2d")

    let existingShapes: Shape[] =await getExistingShapes(roomId) as Shape[];

    if(!ctx){
        return
    }
    
    let clicked = false;
    
    ctx.fillStyle="rgba(0,0,0)"
    ctx.fillRect(0,0,canvas.width,canvas.height);
    
    let startX=0;
    let startY=0;
    
    canvas.addEventListener("mousedown",(e)=>{
        clicked = true;
        startX = e.clientX;
        startY = e.clientY;
        
    })

    canvas.addEventListener("mouseup",(e)=>{
        clicked = false;
        const width = e.clientX - startX;
        const height = e.clientY - startY;

        existingShapes.push({
            type:"rect",
            x:startX,
            y:startY,
            width,
            height
        })

        
    })
    

    
    canvas.addEventListener("mousemove",(e)=>{
        
        if(clicked){
            
            const width = e.clientX - startX;
            const height = e.clientY - startY;
            console.log(width,height);
            
            
            clearCanvas(canvas,ctx,existingShapes);
            
            
            ctx.strokeStyle="white"
            ctx.strokeRect(startX,startY,width,height);
        }
        
    })
}

function clearCanvas(canvas:HTMLCanvasElement,ctx:CanvasRenderingContext2D,existingShapes:Shape[]){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle="rgba(0,0,0)"
    ctx.fillRect(0,0,canvas.width,canvas.height);
    
    existingShapes.map(shape=>{
        switch (shape.type){
            case "rect":
                ctx.strokeRect(shape.x,shape.y,shape.width,shape.height);
                break;
            case "circle":
                break;
            default:
                break;
        }
    })
}

async function getExistingShapes(roomId:string){
    
    const res = await axios.get(`${BACKEND_URL}/room/${roomId}`,{
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("token")
        }
    })
    const data = res.data;
    const messages = data.messages;

    const shapes = messages.map((x:{message:string})=>{
        const messageData = JSON.parse(x.message)
        return messageData;
    })

    return shapes;
}