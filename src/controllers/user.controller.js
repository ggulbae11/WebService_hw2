import bcrypt from "bcryptjs";
import db from "../models/index.js";
import { AppError } from "../errors/AppError.js";
import { ERROR_CODES } from "../constants/errorCodes.js";
import { Op } from "sequelize";

const User = db.User;
/**
 * 회원가입
 */
export const registerUser = async (req, res) => {
  const { email, password, role } = req.body;

  const exists = await User.findOne({ where: { email },
  include: [
    {model: Order}, {model: Review}, {model: Cart}
  ] });
  if (exists) {
    throw new AppError(ERROR_CODES.EXIST_EMAIL);
  }

  const hashed = bcrypt.hashSync(password, 10);

  const user = await User.create({
    email,
    password: hashed,
    role: role || "USER",
    active: true
  });

  res.status(201).json({
    message: "회원가입 완료",
    user: {
      id: user.id,
      email: user.email,
      role: user.role
    }
  });
};

/**
 * 내 정보 조회
 */
export const getMe = async (req, res) => {
  const userId = req.user.id;

  const user = await User.findByPk(userId, {
    attributes: ["id", "email", "role", "active"]
  });

  if (!user) {
    throw new AppError(ERROR_CODES.MISSING_USER);
  }

  res.json({
    message: "내 정보 조회 성공",
    user
  });
};

/**
 * 전체 사용자 조회 (ADMIN)
 */
export const getAllUsers = async (req, res, next) => {
  try {
    let { keyword, sort, page = 1, size = 10 } = req.query;

    page = parseInt(page);
    size = parseInt(size);

    const where = {};
    if (keyword) {
      where.title = { [Op.like]: `%${keyword}%` };
    }

    const order = [];
    if (sort) {
      const [field, direction] = sort.split("_");
      order.push([field, direction]);
    }

    const { rows, count } = await User.findAndCountAll({
      where,
      order,
      limit: size,
      offset: (page - 1) * size
    });

    res.json({
      content: rows,
      page,
      size,
      totalElements: count,
      totalPages: Math.ceil(count / size)
    });
  } catch (err) {
    next(err);
  }
};

/**
 * 단일 사용자 조회 (ADMIN)
 */
export const getUserById = async (req, res) => {
  const { id } = req.params;

  const user = await User.findByPk(id, {
    attributes: ["id", "email", "role", "active"]
  });

  if (!user) {
    throw new AppError(ERROR_CODES.MISSING_USER);
  }

  res.json(user);
};

/**
 * 사용자 수정 (ADMIN)
 */
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, password } = req.body;

  const user = await User.findByPk(id);
  if (!user) {
    throw new AppError(ERROR_CODES.MISSING_USER);
  }

  if (email) user.email = email;
  if (password) user.password = bcrypt.hashSync(password, 10);

  await user.save();

  res.json({ message: "유저 정보 수정 완료" });
};

/**
 * 사용자 비활성화 (ADMIN)
 */
export const deactivateUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findByPk(id);
  if (!user) {
    throw new AppError(ERROR_CODES.MISSING_USER);
  }

  user.active = false;
  await user.save();

  res.json({ message: "유저 정지됨", user });
};

/**
 * 사용자 활성화 (ADMIN)
 */
export const activateUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findByPk(id);
  if (!user) {
    throw new AppError(ERROR_CODES.MISSING_USER);
  }

  user.active = true;
  await user.save();

  res.json({ message: "유저 정지 해제", user });
};

/**
 * 사용자 삭제 (ADMIN)
 */
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  const deleted = await User.destroy({ where: { id } });

  if (!deleted) {
    throw new AppError(ERROR_CODES.MISSING_USER);
  }

  res.json({ message: "유저 삭제 완료" });
};

/**
 * 회원 탈퇴
 */
export const deleteMe = async (req, res) => {
  const userId = req.user.id;

  const deleted = await User.destroy({
    where: { id: userId }
  });

  if (!deleted) {
    throw new AppError(ERROR_CODES.MISSING_USER);
  }

  res.json({ message: "회원 탈퇴 완료" });
};

export const logout = (req, res) => {
  const userId = req.user.id;
  
  return res.json({
    message: "로그아웃 성공"
  });
};
