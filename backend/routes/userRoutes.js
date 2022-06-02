import { Router } from "express";

const router = Router();

import authMiddleware from "../middleware/authMiddleware.js";

import {
  registerUser,
  loginUser,
  getUser,
} from "../controllers/userController.js";

router.route("/").get(authMiddleware, getUser);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

export default router;
