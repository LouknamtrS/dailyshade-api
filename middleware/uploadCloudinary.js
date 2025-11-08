const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
require("dotenv").config();

//ตั้งค่า cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//สร้าง storage สำหรับ multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "my_gallery", //โฟลเดอร์ใน cloudinary
    format: async (req, file) => file.mimetype.split("/")[1],
    public_id: (req, file) => Date.now() + "_" + file.originalname,
  },
});

const upload = multer({ storage });

module.exports = upload;
