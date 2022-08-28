import User from "../models/userModel.js";
import Blog from "../models/blogModel.js";
import { isMongoObjectId } from "../helper/isMongoObject.js";

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();

    if (!blogs) return res.status(404).json({ message: "No blogs found" });
    res.json(blogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const getBlog = async (req, res) => {
  try {
    if (!isMongoObjectId(req.params.id)) throw new Error("Invalid id");

    const blog = await Blog.findOne({ _id: req.params.id });

    if (blog.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const createBlog = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Please login" });

  const { title, content } = req.body;
  const user = await User.findById(req.user.id);
  console.log(user);
  if (!user) return res.status(404).json({ message: "User not found" });
  try {
    const payload = {
      title,
      content,
    };

    const newBlog = await Blog.create({ ...payload, user: req.user?.id });
    res.json(newBlog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const updateBlog = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Please login" });
    if (!isMongoObjectId(req.params.id)) throw new Error("Invalid id");

    const blog = await Blog.findOne({ _id: req.params.id });

    if (!blog) return res.status(404).json({ message: "Blog not found" });
    if (blog.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const { title, content } = req.body;
    const payload = {
      title,
      content,
    };

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, payload, {
      new: true,
    });
    res.json(updatedBlog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const deleteBlog = async (req, res) => {
  console.log(req.user);
  try {
    // check if the id is a valid mongo object id
    if (!isMongoObjectId(req.params.id)) throw new Error("Invalid id");
    if (!req.user) return res.status(401).json({ message: "User not found" });

    const blog = await Blog.findOne({ _id: req.params.id });

    if (!blog) return res.status(404).json({ message: "Blog not found" });
    if (blog.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await Blog.findByIdAndDelete(id);
    res.json({ message: "Blog deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export { getBlogs, getBlog, createBlog, updateBlog, deleteBlog };
