import express from 'express';
import { login, register, getUsers, fetchUserById, getLoggedInUserId } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/getusers', getUsers);
router.get('/:userId', fetchUserById);
router.get('/user-id', getLoggedInUserId);


export default router;