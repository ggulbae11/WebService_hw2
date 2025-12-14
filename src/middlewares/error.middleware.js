import { AppError } from "../errors/AppError.js";

export const errorHandler = (err, req, res, next) => {
  console.error("[ERR]", {
    message: err?.message,
    name: err?.name,
    code: err?.code,
    path: req.originalUrl,
    method: req.method
  });
  if (err?.stack) console.error(err.stack);

  if (err instanceof AppError) {
    return res.status(err.status).json({
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
      status: err.status,
      code: err.code,
      message: err.message,
      details: err.details
    });
  }

  // 예상 못한 에러
  return res.status(500).json({
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
    status: 500,
    code: "UNKNOWN_ERROR",
    message: "알 수 없는 서버 오류",
    details: null
  });
};
