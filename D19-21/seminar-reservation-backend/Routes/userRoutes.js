import express from 'express';
import { getProfile, updateProfile } from '../Controllers/userController.js';
import authMiddleware from '../Middleware/authMiddleware.js';

const router = express.Router();

router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);

export default router;