import { Router } from "express";

const router = Router();

import userRoutes from "./user.routes.js";
import blogRoutes from "./blog.routes.js";

const status = (req, res) => {
  res.json({
    status: "success",
    message: "Server is running",
  });
};

router.route("/").get(status);

router.use("/api/users", userRoutes);
router.use("/api/blogs", blogRoutes);

export default router;
