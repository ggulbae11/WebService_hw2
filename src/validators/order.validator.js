import { param } from "express-validator";

export const orderIdParamValidator = [
  param("id").isInt().withMessage("orderId는 숫자")
];
