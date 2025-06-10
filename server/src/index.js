import express from "express";
import dotenv from "dotenv";
import router from "./routes/router.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/mongoose.js";

dotenv.config();

const APP_PORT = process.env.APP_PORT || 3003;
const CLIENT_URL =  "http://localhost:5173";

const app = express();

const corsOptions = {
  origin: CLIENT_URL,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const startServer = async () => {
    await connectDB(); // MongoDB
    app.listen(APP_PORT, () => {
      console.log(`Server running on port ${APP_PORT}`);
    });
};

// multer
app.use('/public', express.static('public'));

app.use("/",router);


startServer();
