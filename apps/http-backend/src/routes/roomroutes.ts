import express,{NextFunction, Request,Response } from "express";
import { createRoomSchema,addRoomSchema,deleteRoomMemberSchema } from "@repo/common/schema/roomschema";
import RoomControllerInstance from "../controllers/roomcontroller";
const router:express.Router = express.Router();
import { jwtMiddleWareFunc } from "../auth/auth";
import validate from "../utils/validate";



router.use(jwtMiddleWareFunc);



router.post('create',validate(createRoomSchema),RoomControllerInstance.createRoom)


router.post('add-user',validate(addRoomSchema),RoomControllerInstance.addRoomMember)


router.put('remove-user',validate(deleteRoomMemberSchema),RoomControllerInstance.removeRoomMember)

export default router;