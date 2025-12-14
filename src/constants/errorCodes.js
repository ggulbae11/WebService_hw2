export const ERROR_CODES = {
  BAD_REQUEST: {
    status: 400,
    code: "BAD_REQUEST",
    message: "잘못된 요청입니다."
  },
  MISSING_USER: {
    status: 400,
    code: "MISSING_USER",
    message: "존재하지 않는 유저입니다."
  },
  EMPTY_CART: {
    status: 400,
    code: "EMPTY_CART",
    message: "장바구니가 비어있습니다."
  },
    VALIDATION_FAILED: {
    status: 400,
    code: "VALIDATION_FAILED",
    message: "입력값이 올바르지 않습니다."
  },
  UNAUTHORIZED: {
    status: 401,
    code: "UNAUTHORIZED",
    message: "인증이 필요합니다."
  },
    TOKEN_EXPIRED: {
    status: 401,
    code: "TOKEN_EXPIRED",
    message: "토큰이 만료되었습니다."
  },
  FORBIDDEN: {
    status: 403,
    code: "FORBIDDEN",
    message: "접근 권한이 없습니다."
  },
  NOT_FOUND: {
    status: 404,
    code: "RESOURCE_NOT_FOUND",
    message: "리소스를 찾을 수 없습니다."
  },
  MISSING_BOOK: {
    status: 404,
    code: "MISSING_BOOK",
    message: "책을 찾을 수 없습니다."
  },
  MISSING_CART: {
    status: 404,
    code: "MISSING_CART",
    message: "장바구니를 찾을 수 없습니다."
  },
  MISSING_ORDER: {
    status: 404,
    code: "MISSING_ORDER",
    message: "주문을 찾을 수 없습니다."
  },
  MISSING_REVIEW: {
    status: 404,
    code: "MISSING_REVIEW",
    message: "리뷰를 찾을 수 없습니다."
  },
  EXIST_EMAIL: {
    status: 409,
    code: "EXIST_EMAIL",
    message: "이미 존재하는 이메일입니다."
  },
  UNPROCESSABLE_ENTITY: {
    status: 422,
    code: "UNPROCESSABLE_ENTITY",
    message: "처리할 수 없는 요청입니다"
  },
  TOO_MANY_REQUESTS: {
    status: 429,
    code: "TOO_MANY_REQUESTS",
    message: "요청이 너무 많습니다"
  },
  INTERNAL_SERVER_ERROR: {
    status: 500,
    code: "INTERNAL_SERVER_ERROR",
    message: "서버 내부 오류입니다."
  }
};