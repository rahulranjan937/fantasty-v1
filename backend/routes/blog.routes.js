import { Router } from "express";

const router = Router();

import authMiddleware from "../middleware/authMiddleware.js";

import {
  getBlogs,
  getBlogsByUser,
  getBlogbyId,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";

router.route("/all").get(getBlogs); // Public route
router.route("/").post(authMiddleware, createBlog); // Private route
router.route("/:id").get(authMiddleware, getBlogbyId); // Private route
router.route("/").get(authMiddleware, getBlogsByUser); // Private route
router.route("/:id").put(authMiddleware, updateBlog); // Private route
router.route("/:id").delete(authMiddleware, deleteBlog); // Private route

export default router;
