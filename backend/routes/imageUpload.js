import express from "express";
import upload from "../middleware/upload.js";
import cloudinary from "../config/cloudinary.js";

const imageUpload = express.Router();

imageUpload.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const file = req.file;

    if (!file) return res.status(400).json({ error: "No file uploaded" });

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "categories" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(file.buffer);
    });

    // 🔥 IMPORTANT — return URL
    res.json({
      message: "Upload successful",
      image_url: result.secure_url,
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

export default imageUpload;