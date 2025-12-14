import { body, param } from "express-validator";

export const registerUserValidator = [
  body("email").isEmail().withMessage("이메일 형식 오류"),
  body("password")
    .isLength({ min: 4 })
    .withMessage("비밀번호는 최소 4자"),
  body("role")
    .optional()
    .isIn(["USER", "ADMIN"])
    .withMessage("role 값 오류")
];

export const updateUserValidator = [
  body("password")
    .optional()
    .isLength({ min: 4 })
    .withMessage("비밀번호는 최소 4자")
];

export const userIdParamValidator = [
  param("id").isInt().withMessage("id는 숫자여야 합니다")
];
