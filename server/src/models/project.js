import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  listId: {
    type: String,
    required: true
  }
}, { _id: false });

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
    url: {
        type: String,
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
    folderId: {
        type: String,
        required: true
    },
    clickupLists: {
        type: [listSchema],
        default: []
    }
});


export default mongoose.model("Project", projectSchema);
