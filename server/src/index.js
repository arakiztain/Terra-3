import express from "express";
import dotenv from "dotenv";
import router from "./routes/router.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/mongoose.js";
import sequelize from "./config/sqlite.js";

dotenv.config();

const APP_PORT = process.env.APP_PORT || 3003;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

const app = express();

const corsOptions = {
  origin: CLIENT_URL,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

const startServer = async () => {
  try {
    await connectDB(); // MongoDB
    await sequelize.sync(); // SQLite

    console.log("✅ Base de datos SQLite sincronizada correctamente");

    app.listen(APP_PORT, () => {
      console.log(`🚀 Backend conectado al puerto ${APP_PORT}`);
    });

  } catch (error) {
    console.error("❌ Error iniciando la aplicación:", error);
  }
};

startServer();
