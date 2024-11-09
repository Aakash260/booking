import express, { Response, Request } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import { HotelType } from "../shared/types.js";
import Hotel from "../models/hotel.js";
import VerifyToken from "../middleware/auth.js";
import { body } from "express-validator";
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
router.post(
  "/",
VerifyToken,
[
body('name').notEmpty().withMessage('Name is required'),
body('city').notEmpty().withMessage('City is required'),
body('country').notEmpty().withMessage('Country is required'),
body('descripton').notEmpty().withMessage('Description is required'),
body('type').notEmpty().withMessage('Hotel type is required'),
body('pricePerNight').notEmpty().isNumeric().withMessage("Price per night is required and must be number"),
body('facilities').notEmpty().isArray().withMessage('Facilities are required')
],
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newHotels: HotelType = req.body;

      const uploadPromises = imageFiles.map(async (image) => {
        const base64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = "data:" + image.mimetype + ";base64," + base64;
        const res = await cloudinary.v2.uploader.upload(dataURI);
        return res.url;
      });
      const imageUrl = await Promise.all(uploadPromises);

      newHotels.imageUrls = imageUrl;
      newHotels.lastUpdated = new Date();
      newHotels.userId = req.userId;

      const hotel = new Hotel(newHotels);
      await hotel.save();
      res.status(201).send(hotel);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.get("/", VerifyToken, async (req: Request, res: Response) => {
    try {
      const hotels = await Hotel.find({ userId: req.userId });
      res.json(hotels);
    } catch (error) {
      res.status(500).json({ message: "Error fetching hotels" });
    }
  });

export default router