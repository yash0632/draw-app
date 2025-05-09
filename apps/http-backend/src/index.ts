import express, { Request, Response ,Application} from "express"
import logger from "@repo/backend-common/logger"

import dotenv from "dotenv"
dotenv.config()
const PORT = process.env.PORT || 3001;
import authRouter from "./routes/userroutes";
import roomRouter from "./routes/roomroutes";


const app:Application = express();
app.use(express.json())


app.use('/auth',authRouter);
app.use('/room',roomRouter);


app.get('/', (req:Request, res:Response) => {
    res.send('Hello World!')
})

app.listen(PORT,()=>{
    logger.info(`Server is running on port ${PORT}`)
})