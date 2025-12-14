import { Router } from "express";

import authRouter from "./auth.route.js";
import userRouter from "./user.route.js";
import bookRouter from "./book.route.js";
import reviewRouter from "./review.route.js";
import cartRouter from "./cart.route.js";
import orderRouter from "./order.route.js";
import adminRouter from "./admin.route.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/books", bookRouter);
router.use("/reviews", reviewRouter);
router.use("/cart", cartRouter);
router.use("/orders", orderRouter);
router.use("/admin", adminRouter);

export default router;
