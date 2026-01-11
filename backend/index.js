import dotenv from "dotenv"
dotenv.config()
import express from "express"
import connectDB from "./config/Db.js"
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/user.routes.js"

const port = process.env.PORT || 5000

const app = express()
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRouter)
app.use("/api/user", userRouter);




app.listen(port,()=>{
    console.log(`server stated ${port}`)
    connectDB();

})