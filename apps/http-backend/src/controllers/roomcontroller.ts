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


    addRoomMember = async(req:Request<{},{},AddRoomMemberType>,res:Response)=>{
        const {roomId} = req.body;
        try{
            if(!req.email){
                return res.status(401).json({
                    message:"Internal Server Error"
                })
            }
            const {room} = await RoomServiceInstance.addRoomMember(roomId,req.email);
            return res.json({
                room:room,
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

    removeRoomMember = async(req:Request<{},{},DeleteRoomMemberType>,res:Response)=>{
        try{
            if(!req.email){
                return res.status(401).json({
                    message:"Internal Server Error"
                })
            }
            const roomId = req.body.roomId;
            const room = await RoomServiceInstance.removeRoomMember(roomId,req.email);
            return res.json({
                room:room,
                message:"Room member removed successfully"
            })
        }
        catch(error){

        }
    }
}
        

export default RoomController.getInstance();