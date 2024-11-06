import { NextFunction } from "express";
import { Request,Response } from "express";
import  jwt, { JwtPayload } from "jsonwebtoken";

declare global{
    namespace Express{
        interface Request{
            userId:string
        }
    }
}

const VerifyToken=(req:Request,res:Response,next:NextFunction) =>{
    const token=req.cookies['auth_token']
if(!token){
     res.status(401).json({message:"Unauthorized"})
    return
}
try {
    const decoded=jwt.verify(token,process.env.JWT_SECRET as string)
    req.userId= (decoded as JwtPayload).userId
    next()
} catch (error) {
     res.status(401).json({message:"Unauthorized"})
    return
}
}
export default VerifyToken