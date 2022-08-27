import { Router } from "express";

const router = Router();

import authMiddleware from "../middleware/authMiddleware.js";

import {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/BlogController.js";

router.route("/").get(getBlogs);
router.route("/").post(authMiddleware, createBlog);
router.route("/:id").get(authMiddleware, getBlog);
router.route("/:id").put(authMiddleware, updateBlog);
router.route("/:id").delete(authMiddleware, deleteBlog);

export default router;
