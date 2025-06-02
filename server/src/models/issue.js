import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
  requestType: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['open', 'in_progress', 'closed'],
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

