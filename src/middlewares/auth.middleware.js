import jwt from "jsonwebtoken";
import db from "../models/index.js";
import { AppError } from "../errors/AppError.js";
import { ERROR_CODES } from "../constants/errorCodes.js";

const { User } = db;

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError(ERROR_CODES.UNAUTHORIZED);
  }

  const token = authHeader.split(" ")[1];

  try {
    // 1️⃣ 토큰 검증
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 2️⃣ DB에서 유저 조회
    const user = await User.findByPk(decoded.id);

    if (!user || user.active === false) {
      throw new AppError(ERROR_CODES.MISSING_USER);
    }

    // 3️⃣ req.user에 필요한 정보만 주입
    req.user = {
      id: user.id,
      email: user.email,
      role: user.role
    };

    next();
  } catch (err) {
    throw new AppError(ERROR_CODES.INVALID_TOKEN);
  }
};
