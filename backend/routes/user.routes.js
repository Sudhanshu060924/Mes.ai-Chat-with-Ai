import express from "express"
import { getAllUsers, getUser, updateUser } from "../controllers/user.controller.js";
import authverify from "../middlewares/authverify.js";
import { upload } from "../middlewares/multer.js";


const userRouter = express.Router()


userRouter.get("/current",authverify, getUser);
userRouter.get("/others", authverify, getAllUsers);
userRouter.put("/profile", authverify,upload.single("image"), updateUser);


export default userRouter;