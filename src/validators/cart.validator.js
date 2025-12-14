import { body } from "express-validator";

/**
 * 장바구니 추가
 * POST /api/cart
 */
export const addToCartValidator = [
  body("bookId")
    .isInt({ min: 1 })
    .withMessage("bookId must be a positive integer"),

  body("qty")
    .isInt({ min: 1, max: 100 })
    .withMessage("qty must be an integer between 1 and 100"),
];

/**
 * 장바구니 수량 수정 (PATCH)
 * PATCH /api/cart
 */
export const updateCartValidator = [
  body("bookId")
    .isInt({ min: 1 })
    .withMessage("bookId must be a positive integer"),

  body("qty")
    .isInt({ min: 1, max: 100 })
    .withMessage("qty must be an integer between 1 and 100"),
];

/**
 * 장바구니에서 상품 제거
 * DELETE /api/cart
 */
export const removeFromCartValidator = [
  body("bookId")
    .isInt({ min: 1 })
    .withMessage("bookId must be a positive integer"),
];
