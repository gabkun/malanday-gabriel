import express from 'express';
import { getSeminars, getSeminarDetails , createSeminar, updateSeminar, deleteSeminar } from '../Controllers/seminarController.js';
import authMiddleware from '../Middleware/authMiddleware.js';
import adminMiddleware from '../Middleware/adminMiddleware.js';

const router = express.Router();

router.get('/', getSeminars);
router.get('/:id', getSeminarDetails);
router.post('/', authMiddleware, adminMiddleware, createSeminar);
router.put('/:id', authMiddleware, adminMiddleware, updateSeminar);
router.delete('/:id', authMiddleware, adminMiddleware, deleteSeminar);

export default router;