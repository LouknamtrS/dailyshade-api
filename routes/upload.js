const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadCloudinary");

// รับไฟล์ field name: 'image'
router.post("/image", upload.single("image"), (req, res) => {
  try {
    res.json({
      message: "Upload สำเร็จ",
      url: req.file.path,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
