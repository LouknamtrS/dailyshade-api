const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const { readdirSync } = require("fs");
const connectDB = require("./db");
const uploadRoute = require("./routes/upload");

dotenv.config();

const app = express();

//Connect database
connectDB();

//Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json({ limit: "20mb" }));

app.use(
  cors({
    origin: process.env.CLIENT_PATH, //frontend url
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, 
  })
);

//Upload route
app.use("/api/upload", uploadRoute);

//Load routes อื่น ๆ
readdirSync("./routes").forEach((route) => {
  if (route !== "upload.js") {
    app.use("/api", require("./routes/" + route));
  }
});

//Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
