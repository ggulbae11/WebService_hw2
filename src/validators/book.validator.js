import { body, param, query } from "express-validator";

export const createBookValidator = [
  body("title").notEmpty().withMessage("제목 필수"),
  body("price").isInt({ min: 0 }).withMessage("가격 오류")
];

export const updateBookValidator = [
  body("title").optional().notEmpty(),
  body("price").optional().isInt({ min: 0 })
];

export const bookIdParamValidator = [
  param("id").isInt().withMessage("bookId는 숫자")
];

export const bookQueryValidator = [
  query("page").optional().isInt({ min: 0 }),
  query("size").optional().isInt({ min: 1, max: 100 }),
  query("sort").optional().isString()
];
