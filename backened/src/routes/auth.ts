import express, { Request, Response } from "express";
import User, { UserType } from "../models/user.js"; // Ensure your user model is correctly defined
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import VerifyToken from "../middleware/auth.js";
const router = express.Router();

router.post(
    "/login",
    [
      check("email").isEmail().withMessage("Please provide a valid email"),
      check("password").isString().withMessage("Password is required"),
    ],
    async (req: Request<{}, {}, { email: string; password: string }>, res: Response) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         res.status(400).json({ message: errors.array() });
         return
      }
  
      try {
        const { email, password } = req.body;
  
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "Invalid email or password" });
            return
        }
  
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid email or password" });
            return
        }
 
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, {
          expiresIn: "1d",
        });
        res.cookie("auth_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 86400000,  
        });
  
        res.status(200).json({ message: "Login successful",userID:user._id });
      } catch (error) {
        console.error("🚀 ~ router.post ~ error:", error);
        res.status(500).send({ message: "Something went wrong" });
      }
    }
  );

router.post("/logout", (req:Request, res:Response) => {
    res.cookie('auth_token',"",{
      expires:new Date(0)
    })  
    res.send();
});

  router.get('/validate-token',VerifyToken,(req:Request,res:Response)=>{
res.status(200).send({userId:req.userId})
  })  

export default router;
