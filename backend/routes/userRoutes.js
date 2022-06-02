import { Router } from "express";

const router = Router();

import authMiddleware from "../middleware/authMiddleware.js";

import {
  registerUser,
  loginUser,
  getUser,
  allUsers,
} from "../controllers/userController.js";

router.route("/").get(authMiddleware, getUser);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/all").get(allUsers);

export default router;
