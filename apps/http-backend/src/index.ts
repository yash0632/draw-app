import express, { Request, Response ,Application} from "express"
import dotenv from "dotenv"
dotenv.config()
const PORT = process.env.PORT || 3001;
import authRouter from "./routes/authroutes";
import userRouter from "./routes/userrouter";


const app:Application = express();
app.use(express.json())

app.use('/auth',authRouter);
app.use('/user',userRouter);


app.get('/', (req:Request, res:Response) => {
    res.send('Hello World!')
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})