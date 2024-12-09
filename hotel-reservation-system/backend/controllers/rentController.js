import Renting from '../models/Rent.js';
import Room from '../models/Rooms.js';
import User from '../models/Users.js';

const createRental = async (req, res) => {
  try {
    const { userId, roomId, checkInTime, checkOutTime, guests } = req.body;

    if (!userId || !roomId || !checkInTime || !checkOutTime || !guests) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ error: 'Room not found.' });
    }
    if (!room.available) {
      return res.status(400).json({ error: 'Room is already not available.' });
    }

    if (guests.length > room.maxGuests) {
      return res.status(400).json({
        error: `Number of guests exceeds the limit for this room. Max allowed: ${room.maxGuests}.`,
      });
    }

    const checkIn = new Date(checkInTime);
    const checkOut = new Date(checkOutTime);
    const duration = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
    if (duration <= 0) {
      return res.status(400).json({ error: 'Check-out time must be after check-in time.' });
    }

    const totalPrice = duration * room.price;
    const rental = new Renting({
      userId,
      roomId,
      checkInTime,
      checkOutTime,
      totalPrice,
      guests,
    });

    await rental.save();

    await Room.findByIdAndUpdate(roomId, { available: false });

    res.status(201).json({
      message: 'Room rented successfully!',
      rental,
    });
  } catch (error) {
    console.error('Error creating rental:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};

const getRentals = async (req, res) => {
  try {
    const rentals = await Renting.find().populate('userId roomId');
    if (rentals.length === 0) {
      return res.status(404).json({ error: 'No rentals found.' });
    }

    res.status(200).json(rentals);
  } catch (error) {
    console.error('Error fetching rentals:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};

const getRentalDetails = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Rental ID is required.' });
    }

    const rental = await Renting.findById(id).populate('userId roomId');
    if (!rental) {
      return res.status(404).json({ error: 'Rental not found.' });
    }

    res.status(200).json(rental);
  } catch (error) {
    console.error('Error fetching rental details:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};

export { createRental, getRentalDetails, getRentals };