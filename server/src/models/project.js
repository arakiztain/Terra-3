import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    url: {
        type: String,
        trim: true
    }
});

export default mongoose.model("Project", projectSchema);
