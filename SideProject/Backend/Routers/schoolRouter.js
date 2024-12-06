import express from 'express';
import { addSchool, getAllSchools } from '../Controllers/schoolController.js';

const router = express.Router();


router.post('/register', addSchool);
router.get('/schools', getAllSchools);


export default router;