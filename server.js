import express from "express";
import fs from "fs";
import path from "path";
import multer from "multer";

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public/index.html"));
});

// ESP32-CAM gửi ảnh lên
app.post("/upload", upload.single("image"), (req, res) => {
  fs.renameSync(req.file.path, "uploads/latest.jpg");
  res.send("OK");
});

// Xem livestream
app.get("/stream", (req, res) => {
  res.sendFile(path.join(process.cwd(), "uploads/latest.jpg"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server running on port " + port));
