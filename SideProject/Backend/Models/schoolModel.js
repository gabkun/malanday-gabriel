import mongoose from "mongoose";

const SchoolSchema = new mongoose.Schema({
  school_name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  school_address: {
    type: String,
    required: true,
    trim: true,
  },
  school_email: {
    type: String,
    unique: true,
    trim: true,
  },
  school_password: {
    type: String,
    required: true,
    trim: true,
  },
});

export default mongoose.model('School', SchoolSchema);