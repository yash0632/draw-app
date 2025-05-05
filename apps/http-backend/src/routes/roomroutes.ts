import express,{NextFunction, Request,Response } from "express";
import { createRoomSchema,addRoomSchema } from "@repo/common/schema/roomschema";
import RoomControllerInstance from "../controllers/roomcontroller";
const router:express.Router = express.Router();
import { jwtMiddleWareFunc } from "../auth/auth";
import roomcontroller from "../controllers/roomcontroller";


router.use(jwtMiddleWareFunc);



router.post('create',async(req:Request,res:Response)=>{
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


router.post('add-user',async(req:Request,res:Response)=>{
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


router.put('remove-user',async(req:Request,res:Response)=>{
    try{
        roomcontroller.removeRoomMember(req,res);
    }
    catch(error){
        res.json({
            error:error
        })
    }
})

export default router;