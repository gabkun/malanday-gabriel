import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db.js';
import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js'

//cors

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/blog', blogRoutes );

const PORT = process.env.PORT || 4000;

// Root endpoint
app.get("/", (req, res) => {
  res.send("Hello, MongoDB Atlas!");
});

//cors


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});