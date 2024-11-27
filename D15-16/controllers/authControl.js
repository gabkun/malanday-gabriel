import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js'; 

// Register function
const register = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      console.log('Request Body:', req.body);
  
      if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
      }
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });
  
      await newUser.save();
  
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
  
      res.status(201).json({
        message: 'User registered successfully',
        user: { id: newUser._id, name: newUser.name, email: newUser.email },
        token,
      });
    } catch (error) {
      console.error('Error in register:', error);
      res.status(500).json({ error: 'Server Error' });
    }
  };


const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({ email });
        if(!user) return res.status(404).json({error: 'User not found'});

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(400).json({error: 'Invalid Credentials'});

        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.status(200).json({
            token, 
            user: {
                id: user._id, 
                name: user.name,
                email: user.email,
            }
        })

        
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
}

export { register, login };