import express from 'express';
import { register, login } from '../controllers/authControl.js';

const router = express.Router();

// Routes
router.post('/register', register);
router.post('/login', login);

export default router;