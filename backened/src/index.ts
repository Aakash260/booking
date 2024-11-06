import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import cookieParser from "cookie-parser"
import path from "path"
import { fileURLToPath } from 'url';
 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
mongoose
  .connect(process.env.MONGODB_URL as string)
  .then(()=>console.log('connected DB'))
  .catch((error) => console.error("MongoDB connection error:", error));

const app = express();
app.use(cookieParser())
app.use(express.json());
app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials:true
}));

app.use(express.static(path.join(__dirname,"../../frontend/dist")))

app.use('/api/users',userRoute)
app.use('/api/auth',authRoute)

app.listen(7000, () => {
  console.log(" http://localhost:7000");
});
