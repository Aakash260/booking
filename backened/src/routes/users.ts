import express, { Request, Response } from "express";
import User, { UserType } from "../models/user.js"; // Ensure your user model is correctly defined
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import VerifyToken from "../middleware/auth.js";
const router = express.Router();


router.get("/me", VerifyToken, async (req: Request, res: Response) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
       res.status(400).json({ message: "User not found" });
       return
    }
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
});


router.post(
  "/register",
  [
    
    check("email").isEmail().withMessage("Please provide a valid email"),
    check("firstName").isString().trim().notEmpty().withMessage("First name is required"),
    check("lastName").isString().trim().notEmpty().withMessage("Last name is required"),
    check("password")
      .isString()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  async (req: Request<{}, {}, UserType>, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ message: errors.array() });
        return
    }
    try {
      const { email, firstName, lastName, password } = req.body;

      const user = await User.findOne({ email });

      if (!email.trim() || !firstName.trim() || !lastName.trim() || !password.trim()) {
         res.status(400).json({ message: "Please fill all the fields" });
         return
      }
      

      if (user) {
        res.status(400).json({ message: "User already exists" });
        return;
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = await User.create({
        email,
        firstName,
        lastName,
        password: hashedPassword,
      });
      const token = jwt.sign(
        { userId: newUser.id },
        process.env.JWT_SECRET as string,
        { expiresIn: "1d" }
      );
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });

      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.error("🚀 ~ router.post ~ error:", error);
      res.status(500).send({ message: "Something went wrong" });
      return;
    }
  }
);

export default router;
