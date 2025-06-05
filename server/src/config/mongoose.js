import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

export const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`
        );
        console.log("✅ Conectado a MongoDB principal");
    } catch (error) {
        console.error("❌ Error al conectar a MongoDB:", error);
    }
};
