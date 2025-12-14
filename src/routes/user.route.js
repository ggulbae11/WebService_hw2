import { Router } from "express";
import {
  registerUser,
  getAllUsers,
  getUserById,
  updateUser,
  deactivateUser,
  activateUser,
  deleteUser,
  getMe,
  deleteMe,
  logout
} from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";
import { registerUserValidator } from "../validators/user.validator.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: 사용자 API
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: 회원가입
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 example: USER
 *     responses:
 *       201:
 *         description: 회원가입 완료
 */

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: 내 정보 조회
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 내 정보 조회 성공
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: 전체 사용자 조회 (ADMIN)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 사용자 목록
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: 사용자 단건 조회 (ADMIN)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 사용자 정보
 */

/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     summary: 사용자 수정 (ADMIN)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 유저 정보 수정 완료
 */

/**
 * @swagger
 * /api/users/{id}/deactivate:
 *   patch:
 *     summary: 사용자 비활성화 (ADMIN)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 유저 정지됨
 */

/**
 * @swagger
 * /api/users/{id}/activate:
 *   patch:
 *     summary: 사용자 활성화 (ADMIN)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 유저 정지 해제
 */

/**
 * @swagger
 * /api/users/me:
 *   delete:
 *     summary: 회원 탈퇴
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 회원 탈퇴 원료
 */

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: 유저 삭제
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 유저 삭제 완료
 */

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: 로그아웃
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 로그아웃 성공
 */



router.post("/", registerUserValidator, validate, registerUser);
router.get("/me", authenticate, getMe);
router.get("/", authenticate, authorize("ADMIN"), getAllUsers);
router.get("/:id", authenticate, authorize("ADMIN"), getUserById);
router.patch("/:id", authenticate, authorize("ADMIN"), updateUser);
router.patch("/:id/deactivate", authenticate, authorize("ADMIN"), deactivateUser);
router.patch("/:id/activate", authenticate, authorize("ADMIN"), activateUser);
router.delete("/me", authenticate, deleteMe);
router.delete("/:id", authenticate, authorize("ADMIN"), deleteUser);
router.post("/logout", authenticate, logout);


export default router;
