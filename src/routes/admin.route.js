import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";
import { getStats } from "../controllers/admin.controller.js";

const router = Router();

router.get("/stats", authenticate, authorize("ADMIN"), getStats);

export default router;
