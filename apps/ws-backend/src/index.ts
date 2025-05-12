import express from "express";
import configureSocketServer from "./sockets";
import RedisManager from "./sockets/redismanager";
import usermanager from "./sockets/usermanager";
const app = express();
import cors from 'cors'

app.use(cors({
    origin:'http://localhost:3000',
    credentials:true,
    allowedHeaders:['Content-Type','Authorization']
}))
const PORT = process.env.PORT || 3002;

function main(){
    try{
        


        
        const server = app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

        const redisQueue = new RedisManager("draw-queue");
        usermanager.addQueueManager(redisQueue)
        configureSocketServer(server)
        

    }
    catch(e){
        console.log(e)
    }
    
    

}
main();