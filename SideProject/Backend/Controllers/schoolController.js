import School from '../Models/schoolModel.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const addSchool = async (req, res) => {
    try {
      const { school_name, school_address, school_email, school_password } = req.body;
  
      console.log('Request Body:', req.body);
  
      if (!school_name || !school_address || !school_email || !school_password) {
        return res.status(400).json({ error: 'All fields are required' });
      }
  
      const existingSchool = await School.findOne({ school_email });
      if (existingSchool) {
        return res.status(400).json({ error: 'School already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(school_password, salt);
  
      const newSchool = new School({
        school_name,
        school_address,
        school_email,
        school_password: hashedPassword,
      });
  
      await newSchool.save();
  
      const token = jwt.sign({ id: newSchool._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
  
      res.status(201).json({
        message: 'School registered successfully',
        school: { id: newSchool._id, school_name: newSchool.school_name, school_address: newSchool.school_address, school_email: newSchool.school_email },
        token,
      });
    } catch (error) {
      console.error('Error in register:', error);
      res.status(500).json({ error: 'Server Error' });
    }
  };

  const getAllSchools = async (req, res) => {
    try {
      // Fetch all schools from the database
      const schools = await School.find();
  
      if (schools.length === 0) {
        return res.status(404).json({ error: 'No schools found' });
      }
  
      res.status(200).json({
        schools: schools.map(school => ({
          id: school._id,
          school_name: school.school_name,
          school_address: school.school_address,
          school_email: school.school_email,
        })),
      });
    } catch (error) {
      console.error('Error fetching schools:', error);
      res.status(500).json({ error: 'Server Error' });
    }
  };
  export { addSchool, getAllSchools };