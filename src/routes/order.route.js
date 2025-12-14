import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder
} from "../controllers/order.controller.js";
import { orderIdParamValidator } from "../validators/order.validator.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: 주문 API
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: 주문 생성
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 주문 생성됨
 */

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: 내 주문 목록 조회
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 주문 목록
 */

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: 아이디로 주문 조회
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 주문 정보
 */

/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     summary: 주문 취소
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 주문 취소됨
 */


router.post("/", authenticate, createOrder);
router.get("/", authenticate, getMyOrders);
router.get("/:id", authenticate, orderIdParamValidator, validate, getOrderById);
router.delete("/:id", authenticate, cancelOrder);


export default router;
