import { Router } from "express";

const router = Router();

import authMiddleware from "../middleware/authMiddleware.js";

import {
  getSubscriptions,
  getSubscription,
  createSubscription,
  updateSubscription,
  deleteSubscription,
} from "../controllers/subscriptionController.js";

router.route("/").get(authMiddleware, getSubscriptions);
router.route("/").post(authMiddleware, createSubscription);
router.route("/:id").get(authMiddleware, getSubscription);
router.route("/:id").put(authMiddleware, updateSubscription);
router.route("/:id").delete(authMiddleware, deleteSubscription);

export default router;
