import express from 'express';
import { createBooking, getUserBookings, updateBookingStatus } from '../Controllers/bookingController.js';
import authMiddleware from '../Middleware/authMiddleware.js';
import adminMiddleware from '../Middleware/adminMiddleware.js';


const router = express.Router();

router.post('/', authMiddleware, createBooking);
router.get('/', authMiddleware, getUserBookings);
router.put('/:id', authMiddleware, adminMiddleware, updateBookingStatus);

export default router;