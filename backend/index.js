import dotenv from "dotenv"
dotenv.config()
import express from "express"
import connectDB from "./config/Db.js"
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"

const port = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRouter)

app.get("/",(req,res)=>{
    res.send("kkk")
})

app.listen(port,()=>{
    console.log(`server stated ${port}`)
    connectDB();

})