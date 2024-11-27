import express from 'express';
import { addBlog, getBlogs, getBlogById, updateBlog, deleteBlog } from '../controllers/blogControl.js';
import validateBlogData from '../controllers/blogControl.js';
import authenticate from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, validateBlogData, addBlog); 
router.get('/', getBlogs); 
router.get('/:id', getBlogById); 
router.put('/:id', authenticate, validateBlogData, updateBlog); 
router.delete('/:id', authenticate, deleteBlog); 

export default router;