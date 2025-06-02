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
        /* required: true, */
        required: false,
        trim: true
    },
    role: {
        type: String,
        enum: ["admin","client"],
        default: "client"
    },
    activationToken: {
         type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("User", userSchema);