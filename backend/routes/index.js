import { Router } from "express";

const router = Router();

import userRoutes from "./user.routes.js";
import blogRoutes from "./blog.routes.js";
import subscriptionRoutes from "./subscription.routes.js";

const status = (req, res) => {
  res.json({
    status: "success",
    message: "Server is running",
  });
};

router.route("/").get(status);

router.use("/api/v1/users", userRoutes);
router.use("/api/v1/blogs", blogRoutes);
router.use("/api/v1/subscriptions", subscriptionRoutes);

export default router;
