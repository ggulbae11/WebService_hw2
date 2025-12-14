import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../models/index.js";
import { refreshTokens } from "../data/refreshTokens.data.js";
import { AppError } from "../errors/AppError.js";
import { ERROR_CODES } from "../constants/errorCodes.js";

const User = db.User;

/**
 * POST /api/auth/login
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ 유저 조회 (DB)
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new AppError(ERROR_CODES.MISSING_USER);
    }

    // 2️⃣ 비밀번호 검증
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new AppError(ERROR_CODES.VALIDATION_FAILED);
    }

    // 3️⃣ 토큰 발급
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    refreshTokens.push(refreshToken);

    res.json({
      message: "로그인 성공",
      token,
      refreshToken
    });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/auth/refresh
 */
export const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new AppError(ERROR_CODES.UNAUTHORIZED);
    }

    if (!refreshTokens.includes(refreshToken)) {
      throw new AppError(ERROR_CODES.UNAUTHORIZED);
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

    const newAccessToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "토큰 재발급 성공",
      accessToken: newAccessToken
    });
  } catch (err) {
    next(err);
  }
};
