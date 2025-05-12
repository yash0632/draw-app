import express, { NextFunction, Request, Response } from "express";
import {
  createRoomSchema,
  addRoomSchema,
  deleteRoomMemberSchema,
  GetRoomIdSchema,
} from "@repo/common/schema/roomschema";
import RoomControllerInstance from "../controllers/roomcontroller";
const router: express.Router = express.Router();
import { jwtMiddleWareFunc } from "../middleware/auth";
import validate from "../utils/validate";

router.use(jwtMiddleWareFunc);

router.post(
  "/create",
  jwtMiddleWareFunc,
  validate(createRoomSchema),
  RoomControllerInstance.createRoom
);

router.get(
  "/:slug",
  jwtMiddleWareFunc,
  validate(GetRoomIdSchema),
  RoomControllerInstance.GetRoomId
)


// router.post(
//   "add-user",
//   jwtMiddleWareFunc,
//   validate(addRoomSchema),
//   RoomControllerInstance.addRoomMember
// );

// router.put(
//   "remove-user",
//   jwtMiddleWareFunc,
//   validate(deleteRoomMemberSchema),
//   RoomControllerInstance.removeRoomMember
// );

export default router;
