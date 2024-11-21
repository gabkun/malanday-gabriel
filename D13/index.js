import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db.js';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 4000;


app.get("/", (req, res) => {
    res.send("Hello, MongoDB Atlas!");
  });

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});