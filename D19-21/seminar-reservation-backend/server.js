import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './Config/db.js';

import authRoutes from './Routes/authRoutes.js';
import userRoutes from './Routes/userRoutes.js';
import seminarRoutes from './Routes/seminarRoutes.js';
import bookingRoutes from './Routes/bookingRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/seminars', seminarRoutes);
app.use('/api/bookings', bookingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));