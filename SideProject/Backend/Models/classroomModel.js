import mongoose from "mongoose";

const ClassroomSchema = new mongoose.Schema({
  school_id: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  classroom_number: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  subject: {
    type: String,
    required: true,
    trim: true,
  },
  teacher: {
    type: String,
    required: true,
    trim: true,
  },
});

export default mongoose.model('Classroom', ClassroomSchema);