import express from 'express';
import { createRental, getRentalDetails, getRentals } from '../controllers/rentController.js';

const router = express.Router();

router.post('/register', createRental);
router.get('/', getRentals);
router.get('/:id', getRentalDetails);




export default router;