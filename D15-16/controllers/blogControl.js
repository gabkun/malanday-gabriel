import Blog from "../models/blogModel.js";

const validateBlogData = (req, res, next) => {
    const { title, content } = req.body;
  
    if (!title || !content) {
      return res.status(400).json({ message: "All fields are required." });
    }
  
    next();
  };
  
  export default validateBlogData;


  const addBlog = async (req, res) => {
    try {
      const { title, content } = req.body;
      const author = req.user._id;
  
      const newBlog = new Blog({ title, content, author });
      await newBlog.save();
  
      res.status(201).json({ message: "Blog created successfully.", data: newBlog });
    } catch (error) {
      console.error('Error creating blog:', error.message);
      res.status(500).json({ message: "Error creating blog.", error: error.message });
    }
  };


const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "name email"); 
    res.status(200).json({ message: "Blogs fetched successfully.", data: blogs });
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs.", error: error.message });
  }
};

const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id).populate("author", "name email");
    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }
    res.status(200).json({ message: "Blog fetched successfully.", data: blog });
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog.", error: error.message });
  }
};

const updateBlog = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content } = req.body;
  
      const blog = await Blog.findById(id);
      if (!blog) {
        return res.status(404).json({ message: "Blog not found." });
      }
      if (blog.author.toString() !== req.user._id) {
        return res.status(403).json({ error: "You are not authorized to update this blog." });
      }
      blog.title = title;
      blog.content = content;
      const updatedBlog = await blog.save();
  
      res.status(200).json({ message: "Blog updated successfully.", data: updatedBlog });
    } catch (error) {
      console.error('Error updating blog:', error.message);
      res.status(500).json({ message: "Error updating blog.", error: error.message });
    }
  };

const deleteBlog = async (req, res) => {
    try {
      const { id } = req.params;
  
      const blog = await Blog.findById(id);
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found.' });
      }
  
      if (blog.author.toString() !== req.user.id) {
        return res.status(403).json({ error: 'You are not authorized to delete this blog.' });
      }
  
      await Blog.findByIdAndDelete(id);
      res.status(200).json({ message: 'Blog deleted successfully.' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting blog.', error: error.message });
    }
  };

export { validateBlogData, addBlog, getBlogs, getBlogById, updateBlog, deleteBlog };