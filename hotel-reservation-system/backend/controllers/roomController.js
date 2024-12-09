import Room from "../models/Rooms.js";
import mongoose from "mongoose";

const createRoom = async (req, res) => {
    try {
      const { roomName, type, price, roomSize, maxGuests, description, amenities, available } = req.body;
      if (!roomName || !type || !price || !roomSize || !maxGuests || !description) {
        return res.status(400).json({ error: 'All required fields must be filled.' });
      }
      const validRoomTypes = ['Single', 'Double', 'Suite', 'Family'];
      if (!validRoomTypes.includes(type)) {
        return res.status(400).json({ error: `Invalid room type. Valid types are: ${validRoomTypes.join(', ')}` });
      }
      const existingRoom = await Room.findOne({ roomName });
      if (existingRoom) {
        return res.status(400).json({ error: 'Room with this name already exists.' });
      }
  
      const newRoom = new Room({
        roomName,
        type,
        price,
        roomSize,
        maxGuests,
        description,
        amenities: amenities || [], 
        available: available !== undefined ? available : true, 
      });
  
      await newRoom.save();
  
      res.status(201).json({
        message: 'Room created successfully!',
        room: newRoom,
      });
    } catch (error) {
      console.error('Error creating room:', error);
      res.status(500).json({ error: 'Server Error' });
    }
  };

  const getRooms = async (req, res) => {
    try {
      const rooms = await Room.find(); 
      res.status(200).json({
        message: 'Rooms retrieved successfully!',
        rooms,
      });
    } catch (error) {
      console.error('Error fetching rooms:', error);
      res.status(500).json({ error: 'Server Error' });
    }
  };

  const getRoomDetails = async (req, res) => {
    try {
      const { roomId } = req.params;
  
      // Check if the roomId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(roomId)) {
        return res.status(400).json({ error: 'Invalid room ID format' });
      }
  
      const room = await Room.findById(roomId);
  
      if (!room) {
        return res.status(404).json({ error: 'Room not found' });
      }
  
      res.status(200).json({
        message: 'Room details retrieved successfully!',
        room,
      });
    } catch (error) {
      console.error('Error fetching room details:', error);
      res.status(500).json({ error: 'Server Error' });
    }
  };
  
  export {createRoom, getRooms, getRoomDetails};