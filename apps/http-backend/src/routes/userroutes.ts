import express, { Router } from "express";
import { signupSchema, signinSchema } from "@repo/common/schema/userschema";
import UserControllerInstance from "../controllers/usercontroller";
import validate from "../utils/validate";
import { jwtMiddleWareFunc } from "../middleware/auth";

const router:Router = express.Router();

router.post(
  "/register",
  validate(signupSchema),
  UserControllerInstance.register
);

router.post(
  "/signin",
  validate(signinSchema),
  UserControllerInstance.login
);

export default router;
