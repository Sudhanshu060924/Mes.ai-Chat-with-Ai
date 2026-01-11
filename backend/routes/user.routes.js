import express from "express"
import { getUser } from "../controllers/user.controller.js";
import authverify from "../middlewares/authverify.js";


const userRouter = express.Router()


userRouter.post("/current",authverify, getUser);


export default userRouter;