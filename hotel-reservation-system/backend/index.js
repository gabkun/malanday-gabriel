import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db.js';
import authRoutes from './routes/userRouter.js';
import roomRoutes from './routes/roomRouter.js'
import rentRoutes from './routes/rentRouter.js'
import cors from 'cors'
import bodyParser from 'body-parser'; 


dotenv.config();
connectDB();

const app = express();

//cors

app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, 
}));

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/room', roomRoutes);
app.use('/api/rent', rentRoutes);

const PORT = process.env.PORT || 4000;

// Root endpoint
app.get("/", (req, res) => {
  res.send("Hello, MongoDB Atlas!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});