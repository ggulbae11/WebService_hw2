import { body, param } from "express-validator";

export const createReviewValidator = [
  body("bookId").isInt(),
  body("rating").isInt({ min: 1, max: 5 }),
  body("content").notEmpty()
];

export const reviewIdParamValidator = [
  param("id").isInt()
];

export const bookIdParamValidator = [
  param("bookId").isInt()
];

export const updateReviewValidator = [
  // URL 파라미터
  param("id")
    .isInt({ min: 1 })
    .withMessage("reviewId must be a positive integer"),

  // rating (선택)
  body("rating")
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage("rating must be an integer between 1 and 5"),

  // content (선택)
  body("content")
    .optional()
    .isString()
    .isLength({ min: 1, max: 500 })
    .withMessage("content must be 1~500 characters"),

  // 최소 1개 필드 강제
  body()
    .custom((value) => {
      if (!value.rating && !value.content) {
        throw new Error("At least one field (rating or content) is required");
      }
      return true;
    }),
];