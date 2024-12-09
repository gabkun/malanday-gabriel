import express from 'express';
import {createRoom, getRooms, getRoomDetails} from '../controllers/roomController.js';

const router = express.Router();

router.post('/register', createRoom);
router.get('/', getRooms);
router.get('/:roomId', getRoomDetails);

export default router;