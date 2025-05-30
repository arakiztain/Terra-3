import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    email: {
    type: String,
    required: true,
    unique: true,
    trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ["admin","client"],
        default: "client"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("User", userSchema);