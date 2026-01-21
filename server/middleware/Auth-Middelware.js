const jwt=require("jsonwebtoken");
require("dotenv").config();

const authMiddleWare=(req,res,next)=>{
    try {
        const token=req.headers.authorization?.split(" ")[1];
        if(!token)
        {
            return res.status(401).json({
                message:"token not found"
            })
        }
        const decoded =jwt.verify(token, process.env.MYSECRECT_KEY);
        req.user=decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message:"Invalid token"
        })
        
    }
}
module.exports = authMiddleWare;
