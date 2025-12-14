import { body } from "express-validator";

export const loginValidator = [
  body("email")
    .isEmail()
    .withMessage("이메일 형식이 아닙니다"),
  body("password")
    .notEmpty()
    .withMessage("비밀번호는 필수입니다")
];

export const refreshValidator = [
  body("refreshToken")
    .notEmpty()
    .withMessage("refreshToken은 필수입니다")
];
