import express from "express"
import { getUser, updateUser } from "../controllers/user.controller.js";
import authverify from "../middlewares/authverify.js";
import { upload } from "../middlewares/multer.js";


const userRouter = express.Router()


userRouter.get("/current",authverify, getUser);
userRouter.put("/profile", authverify,upload.single("image"), updateUser);


export default userRouter;