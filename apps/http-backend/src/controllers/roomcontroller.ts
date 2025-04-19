import {Request,Response} from "express"
import {CreateRoomType,AddRoomType} from "@repo/common/types/roomtype"

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

    createRoom = async(req:Request<{},{},CreateRoomType>,res:Response)=>{
        const {roomName} = req.body;
        try{
            if(!req.email){
                throw new Error("Internal Server Error");
            }
            const {roomId} = await RoomServiceInstance.createRoom(roomName,req.email);
            return res.json({
                roomName:roomName,
                roomId:roomId,
                message:"Room created successfully"
            })
        }
        catch(err){
            res.json({
                error:err
            })
            return
        }
    }


    addRoomMember = async(req:Request<{},{},AddRoomType>,res:Response)=>{
        const {roomName} = req.body;
        try{
            if(!req.email){
                return res.status(401).json({
                    message:"Internal Server Error"
                })
            }
            const {roomId} = await RoomServiceInstance.addRoomMember(roomName,req.email);
            return res.json({
                roomName:roomName,
                roomId:roomId,
                message:"Room member added successfully"
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