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

    createRoom = async(req:Request<{},{},CreateRoomType['body']>,res:Response)=>{
        const {slug,email} = req.body;

        try{
            const {roomId} = await RoomServiceInstance.createRoom(slug,email);
            res.json({
                roomName:slug,
                roomId:roomId,
                message:"Room created successfully"
            })
            return 
        }
        catch(err:any){
            res.status(400).json({
                message:"Internal Server Error",
                error:err.message
            })
            return
        }
    }


    // addRoomMember = async(req:Request<{},{},AddRoomMemberType['body']>,res:Response)=>{
    //     const {roomId,email} = req.body;
    //     try{
    //         const {room} = await RoomServiceInstance.addRoomMember(roomId,email);
    //         res.json({
    //             roomName:room.roomName,
    //             roomId:roomId,
    //             message:"Room member added successfully"
    //         })
    //         return 
    //     }
    //     catch(error){
    //         res.json({
    //             error:error
    //         })
    //         return
    //     }
    // }

    // removeRoomMember = async(req:Request<{},{},DeleteRoomMemberType['body']>,res:Response)=>{
    //     try{
    //         const {roomId,email} = req.body;
    //         const room = await RoomServiceInstance.removeRoomMember(roomId,email);
    //         res.json({
    //             room:room,
    //             message:"Room member removed successfully"
    //         })
    //         return
    //     }
    //     catch(error){
    //         res.status(500).json({
    //             error:error
    //         })
    //         return
    //     }
    // }
}
        

export default RoomController.getInstance();