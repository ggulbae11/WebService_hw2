import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import {
  getMyCart,
  addToCart,
  removeFromCart,
  clearCart,
  updateCartItem
} from "../controllers/cart.controller.js";
import { addToCartValidator, removeFromCartValidator, updateCartValidator } from "../validators/cart.validator.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: 장바구니 API
 */

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: 내 장바구니 조회
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 장바구니 조회
 */

/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: 장바구니에 도서 추가
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 장바구니에 추가됨
 */

/**
 * @swagger
 * /api/cart:
 *   delete:
 *     summary: 장바구니에서 도서 삭제
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 장바구니에서 제거됨
 */

/**
 * @swagger
 * /api/cart/clear:
 *   delete:
 *     summary: 장바구니 비우기
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 장바구니 비워짐
 */

/**
 * @swagger
 * /api/cart:
 *   patch:
 *     summary: 장바구니 수정
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 수량 수정됨
 */


router.get("/", authenticate, getMyCart);
router.post("/", authenticate, addToCartValidator, validate, addToCart);
router.delete("/", authenticate, removeFromCartValidator, validate, removeFromCart);
router.delete("/clear", authenticate, clearCart);
router.patch("/", authenticate, updateCartValidator, validate, updateCartItem);

export default router;
