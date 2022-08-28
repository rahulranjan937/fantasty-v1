import { Router } from "express";

const router = Router();

import authMiddleware from "../middleware/authMiddleware.js";

import {
  getSubscriptions,
  createSubscription,
  updateSubscription,
} from "../controllers/subscriptionController.js";

router.route("/").get(authMiddleware, getSubscriptions);
router.route("/").post(authMiddleware, createSubscription);
router.route("/:id").put(authMiddleware, updateSubscription);

export default router;
