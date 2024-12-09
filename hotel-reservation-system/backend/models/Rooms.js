import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
  roomName: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['Single', 'Double', 'Suite', 'Family'], 
  },
  price: {
    type: Number,
    required: true,
  },
  roomSize: {
    type: Number, 
    required: true,
  },
  maxGuests: {
    type: Number,
    required: true,
    validate: {
      validator: function (value) {
        return value > 0;
      },
      message: "maxGuests must be a positive number.",
    },
  },
  description: {
    type: String,
    required: true,
  },
  amenities: {
    type: [String], 
    default: [],
  },
  available: {
    type: Boolean,
    default: true, 
  },
});

export default mongoose.model('Room', RoomSchema);