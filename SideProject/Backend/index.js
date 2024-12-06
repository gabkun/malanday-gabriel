import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db.js';
import authRoutes from './Routers/userRouter.js';
import schoolRoutes from './Routers/schoolRouter.js'
import classroomRoutes from './Routers/classroomRouter.js'
import cors from 'cors'
import bodyParser from 'body-parser'; 


dotenv.config();
connectDB();

const app = express();

//cors

app.use(cors({
  origin: 'http://localhost:5173', // Replace with your Vite frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Include this if your frontend and backend share cookies or session data
}));

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/school', schoolRoutes);
app.use('/api/classroom', classroomRoutes);

const PORT = process.env.PORT || 4000;

// Root endpoint
app.get("/", (req, res) => {
  res.send("Hello, MongoDB Atlas!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});