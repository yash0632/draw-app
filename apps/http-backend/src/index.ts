import express, { Request, Response ,Express} from "express"
import logger from "@repo/backend-common/logger"

import dotenv from "dotenv"
dotenv.config()
const PORT = process.env.PORT || 3001;
import userRouter from "./routes/userroutes";
import roomRouter from "./routes/roomroutes";
import { checkDBConnection } from "@repo/db/prismaclient";


const app = express();
app.use(express.json())


app.use('/user',userRouter);
app.use('/room',roomRouter);

app.get('/', (req:Request, res:Response) => {
    res.send('Hello World!')
})

app.listen(PORT,()=>{
    logger.info(`Server is running on port ${PORT}`)
    checkDBConnection();
})