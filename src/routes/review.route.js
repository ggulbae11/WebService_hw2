import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import {
  createReview,
  getBookReviews,
  deleteReview,
  updateReview
} from "../controllers/review.controller.js";
import { createReviewValidator, reviewIdParamValidator, bookIdParamValidator, updateReviewValidator } from "../validators/review.validator.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: 리뷰 API
 */

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: 리뷰 작성
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 리뷰 생성됨
 */

/**
 * @swagger
 * /api/reviews/{bookId}:
 *   get:
 *     summary: 도서별 리뷰 조회
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 리뷰 목록
 */

/**
 * @swagger
 * /api/reviews/{id}:
 *   delete:
 *     summary: 리뷰 삭제
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 리뷰 삭제됨
 */

/**
 * @swagger
 * /api/reviews/{id}:
 *   put:
 *     summary: 리뷰 수정
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 리뷰 수정됨
 */


router.post("/", authenticate, createReviewValidator, validate, createReview);
router.get("/:bookId", bookIdParamValidator, validate, getBookReviews);
router.delete("/:id", authenticate, reviewIdParamValidator, validate, deleteReview);
router.put("/:id", authenticate, updateReviewValidator, validate, updateReview);

export default router;
