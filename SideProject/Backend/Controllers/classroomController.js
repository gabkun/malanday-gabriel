import Classroom from "../Models/classroomModel.js";
import School from "../Models/schoolModel.js";

const createClassroom = async (req, res) => {
    try {
      const { school_id, classroom_number, subject, teacher } = req.body;
  
      console.log('Request Body:', req.body);
  
      if (!school_id || !classroom_number || !subject) {
        return res.status(400).json({ error: 'School ID, Classroom Number, and Subject are required' });
      }
  
      const schoolExists = await School.findById(school_id);
      if (!schoolExists) {
        return res.status(404).json({ error: 'School not found' });
      }
  
      // Create a new classroom
      const newClassroom = new Classroom({
        school_id,
        classroom_number,
        subject,
        teacher: teacher || null,  
      });
  
      await newClassroom.save();
  
      res.status(201).json({
        message: 'Classroom created successfully',
        classroom: {
          id: newClassroom._id,
          school_id: newClassroom.school_id,
          classroom_number: newClassroom.classroom_number,
          subject: newClassroom.subject,
          teacher: newClassroom.teacher,
        },
      });
    } catch (error) {
      console.error('Error creating classroom:', error);
      res.status(500).json({ error: 'Server Error' });
    }
  };
  
  const getClassroomsBySchool = async (req, res) => {
    try {
      const { school_id } = req.params;
      const classrooms = await Classroom.find({ school_id });
  
      if (classrooms.length === 0) {
        return res.status(404).json({ error: 'No classrooms found for this school' });
      }
  
      res.status(200).json({ classrooms });
    } catch (error) {
      console.error('Error fetching classrooms:', error);
      res.status(500).json({ error: 'Server Error' });
    }
  };
  
  const getAllClassrooms = async (req, res) => {
    try {
      const classrooms = await Classroom.find();
  
      if (classrooms.length === 0) {
        return res.status(404).json({ error: 'No classrooms found' });
      }
  
      res.status(200).json({ classrooms });
    } catch (error) {
      console.error('Error fetching classrooms:', error);
      res.status(500).json({ error: 'Server Error' });
    }
  };
  
  const updateClassroomTeacher = async (req, res) => {
    try {
      const { classroom_id } = req.params;
      const { teacher } = req.body;
  
      const classroom = await Classroom.findById(classroom_id);
      if (!classroom) {
        return res.status(404).json({ error: 'Classroom not found' });
      }
  
      classroom.teacher = teacher;
  
      await classroom.save();
  
      res.status(200).json({
        message: 'Classroom teacher updated successfully',
        classroom: {
          id: classroom._id,
          school_id: classroom.school_id,
          classroom_number: classroom.classroom_number,
          subject: classroom.subject,
          teacher: classroom.teacher,
        },
      });
    } catch (error) {
      console.error('Error updating classroom teacher:', error);
      res.status(500).json({ error: 'Server Error' });
    }
  };
  
  export { createClassroom, getClassroomsBySchool, getAllClassrooms, updateClassroomTeacher };