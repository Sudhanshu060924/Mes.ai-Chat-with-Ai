import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

const authverify  = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided." });
        }

        const verifyUser = await jwt.verify(token, process.env.JWT_SECRET);
        req.id = verifyUser.id;

        console.log("Verified User:", verifyUser);
        next();

        
    } catch (error) {
        console.error("Authentication Error:", error);
       return res.status(401).json({ message: "Unauthorized: Invalid token." });
        
    }
}

export default authverify;