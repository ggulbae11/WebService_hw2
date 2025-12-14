import { validationResult } from "express-validator";

export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw {
      status: 400,
      code: "VALIDATION_FAILED",
      message: "입력값 검증 실패",
      details: errors.array()
    };
  }

  next();
};
