import {Request,Response} from "express"
import {CreateRoomType,AddRoomMemberType,DeleteRoomMemberType} from "@repo/common/types/roomtype"

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
            res.json({
                roomName:roomName,
                roomId:roomId,
                message:"Room created successfully"
            })
            return 
        }
        catch(err){
            res.json({
                error:err
            })
            return
        }
    }


    addRoomMember = async(req:Request<{},{},AddRoomMemberType>,res:Response)=>{
        const {roomId} = req.body;
        try{
            if(!req.email){
                res.status(401).json({
                    message:"Internal Server Error"
                })
                return 
            }
            const {room} = await RoomServiceInstance.addRoomMember(roomId,req.email);
            res.json({
                room:room,
                roomId:roomId,
                message:"Room member added successfully"
            })
            return 
        }
        catch(error){
            res.json({
                error:error
            })
            return
        }
    }

    removeRoomMember = async(req:Request<{},{},DeleteRoomMemberType>,res:Response)=>{
        try{
            if(!req.email){
                res.status(401).json({
                    message:"Internal Server Error"
                })
                return;
            }
            const roomId = req.body.roomId;
            const room = await RoomServiceInstance.removeRoomMember(roomId,req.email);
            res.json({
                room:room,
                message:"Room member removed successfully"
            })
            return
        }
        catch(error){
            res.status(500).json({
                error:error
            })
            return
        }
    }
}
        

export default RoomController.getInstance();