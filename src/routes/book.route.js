import express from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
} from "../controllers/book.controller.js";
import { createBookValidator, 
         updateBookValidator, 
         bookIdParamValidator, 
         bookQueryValidator } from "../validators/book.validator.js";
import { validate } from "../middlewares/validate.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: 도서 API
 */

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: 도서 목록 조회
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: 도서 목록
 */

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: 선택 도서 조회
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: 도서 정보
 */

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: 도서 등록 (ADMIN)
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: 책 생성 완료
 */

/**
 * @swagger
 * /api/books/{id}:
 *   patch:
 *     summary: 도서 수정 (ADMIN)
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 책 수정 완료
 */

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: 도서 삭제 (ADMIN)
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 책 삭제 완료
 */


router.get("/", bookQueryValidator, validate, getBooks);
router.get("/:id", bookIdParamValidator, validate, getBookById);
router.post("/", authenticate, authorize("ADMIN"), createBookValidator, validate, createBook);
router.patch("/:id", authenticate, authorize("ADMIN"), bookIdParamValidator, updateBookValidator, validate, updateBook);
router.delete("/:id", authenticate, authorize("ADMIN"), bookIdParamValidator, validate, deleteBook);

export default router;
