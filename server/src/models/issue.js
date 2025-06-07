import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
  requestType: {
    type: String,
    enum: ["copy revision", "design issues", "requested change", "new item"],
    required: true,
    trim: true,
    lowercase: true
  },
  status: {
    type: String,
    enum: ['open', 'in_progress', 'closed'],
    lowercase: true,
    default: 'open'
  },
  requestNumber: {
    type: String,
    required: true,
    unique: true
  },
  inputDate: {
    type: Date,
    default: Date.now
  },
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  device: {
    type: String,
    trim: true
  },
  browser: {
    type: String,
    trim: true
  },
  request: {
    type: String,
    required: true,
    trim: true
  },
  page: {
    type: String,
    trim: true
  },
  screenshot: {
    type: String
  },
  terraComments: {
    type: String,
    trim: true
  }
});

export default mongoose.model("Issue", issueSchema);

