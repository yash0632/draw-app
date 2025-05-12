import express, { Request, Response ,Express,NextFunction} from "express"
import logger from "@repo/backend-common/logger"

import dotenv from "dotenv"
dotenv.config()
const PORT = process.env.PORT || 3001;
import userRouter from "./routes/userroutes";
import roomRouter from "./routes/roomroutes";
import chatRouter from "./routes/chat.routes"
import { checkDBConnection } from "@repo/db/prismaclient";
import cors from "cors"


const app = express();
app.use(express.json())
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true,
    allowedHeaders:['Content-Type','Authorization']
}))


app.use('/user',userRouter);
app.use('/room',roomRouter);
app.use('/chats',chatRouter);

app.get('/', (req:Request, res:Response) => {
    res.send('Hello World!')
})

app.use((err:Error,req:Request,res:Response,next:NextFunction)=>{
    logger.error(err.message);
    res.status(500).json({message:"Internal Server Error"})
})

app.listen(PORT,()=>{
    logger.info(`Server is running on port ${PORT}`)
    checkDBConnection();
})