export function initDraw(canvas:HTMLCanvasElement){
    
    const ctx = canvas.getContext("2d")

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
        
    })
    
    canvas.addEventListener("mousemove",(e)=>{
        
        if(clicked){
            const width = e.clientX - startX;
            const height = e.clientY - startY;
            console.log(width,height);
            ctx.clearRect(0,0,canvas.width,canvas.height);
            
            ctx.fillStyle="rgba(0,0,0)"
            ctx.fillRect(0,0,canvas.width,canvas.height);
            
            ctx.strokeStyle="white"
            ctx.strokeRect(startX,startY,width,height);
            
        }
        
    })
}