import {Request,Response} from "express"

import RoomServiceInstance from "../services/roomservices"
class RoomController{
    static instance : RoomController;
    private constructor(){}

    static getInstance(){
        if(!RoomController.instance){
            RoomController.instance = new RoomController();
        }
        return RoomController.instance;
    }

    createRoom = async(req:Request,res:Response)=>{
        const {roomName} = req.body;
        try{
            if(!req.email){
                throw new Error("Internal Server Error");
            }
            const room = await RoomServiceInstance.createRoom(roomName,req.email);
            return res.json({
                roomName:room.roomName
            })
        }
        catch(err){
            res.json({
                error:err
            })
            return
        }
    }


    addRoomMember = async(req:Request,res:Response)=>{
        const {roomName} = req.body;
        try{
            if(!req.email){
                return res.status(401).json({
                    message:"Internal Server Error"
                })
            }
            const room = await RoomServiceInstance.addRoomMember(roomName,req.email);
            return res.json({
                roomName:room.roomName
            })
        }
        catch(error){
            res.json({
                error:error
            })
            return
        }
    }
}
        

export default RoomController.getInstance();