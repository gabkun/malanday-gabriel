import express from 'express'
import {
    createClassroom,
    getClassroomsBySchool,
    getAllClassrooms,
    updateClassroomTeacher,
  } from '../Controllers/classroomController.js'

  const router = express.Router();

router.post('/register', createClassroom);
router.get('/classrooms/school/:school_id', getClassroomsBySchool);
router.get('/classrooms', getAllClassrooms);
router.put('/classrooms/:classroom_id/teacher', updateClassroomTeacher);

export default router;