import express,{Request,Response } from "express";
import { createRoomSchema,addRoomSchema } from "../schemas/roomschema";
import RoomControllerInstance from "../controllers/roomcontroller";
const router:express.Router = express.Router();
import { jwtMiddleWareFunc } from "../auth/auth";


//@ts-ignore
router.post('create-room',jwtMiddleWareFunc,async(req:Request,res:Response)=>{
    try{
        const {roomName} = req.body;
        const response = createRoomSchema.safeParse(req.body);
        if(!response.success){
            res.status(400).json({
                error:response.error.issues
            })
            return
        }

        await RoomControllerInstance.createRoom(req,res);

    }
    catch(error){
        res.json({
            error:error
        })
    }
})

router.post('add-user',jwtMiddleWareFunc,async(req:Request,res:Response)=>{
    try{
        const {roomName} = req.body;
        const response = addRoomSchema.safeParse(req.body);
        if(!response.success){
            res.status(400).json({
                error:response.error.issues
            })
            return
        }

        await RoomControllerInstance.addRoomMember(req,res);


    }
    catch(error){
        res.json({
            error:error
        })
    }
})

export default router;