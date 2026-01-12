import getToken from "../config/token.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"


export const signUp = async (req,res)=>{
    try {
        const {userName,email,password} = req.body
        const findUser = await User.findOne({userName})
        if(findUser){
            return res.status(400).json({message:"User already exists"})
        }
        const findemail = await User.findOne({ email });
        if (findemail) {
          return res.status(400).json({ message: "Email already exists" });
        }

        if(password.length < 6){
            return res.status(400).json({message:"Password must be at least 6 characters"})
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const user = User.create({
            userName,email,password:hashedPassword
        })

        const token = await getToken(user._id)

        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"Strict",
            maxAge:7*24*60*60*1000,

        })

        res.status(201).json(user)

        
    } catch (error) {
        return  res.status(500).json({message:"Server error",error:error.message})
        
    }
}


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not exists" });
    }
    
    const checkPassword = await bcrypt.compare(password,user.password)

    if(!checkPassword){
        return res.status(400).json({message:"Invalid credentials"})
    }

    

    const token = await getToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json(user)
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
}

export const logout = async (req,res)=>{
    try {
        res.clearCookie("token")
        return res.status(200).json({message:"User logged out successfully"})
    } catch (error) {
        return res.status(500).json({message:"logout error",error:error.message})
    }
}