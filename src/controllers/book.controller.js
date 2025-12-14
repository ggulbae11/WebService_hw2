import db from "../models/index.js";
import { AppError } from "../errors/AppError.js";
import { ERROR_CODES } from "../constants/errorCodes.js";
import { Op } from "sequelize";

const Book = db.Book;

/**
 * GET /api/books
 * 검색 + 정렬 + 페이지네이션
 */
export const getBooks = async (req, res, next) => {
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

    const { rows, count } = await Book.findAndCountAll({
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
 * GET /api/books/:id
 */
export const getBookById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const book = await Book.findByPk(id);
    if (!book) {
      throw new AppError(ERROR_CODES.MISSING_BOOK);
    }

    res.json(book);
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/books (ADMIN)
 */
export const createBook = async (req, res, next) => {
  try {
    const { title, author, description, price } = req.body;

    const newBook = await Book.create({
      title,
      author,
      description,
      price
    });

    res.status(201).json({
      message: "책 생성 완료",
      book: newBook
    });
  } catch (err) {
    next(err);
  }
};

/**
 * PATCH /api/books/:id (ADMIN)
 */
export const updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, author, description, price } = req.body;

    const book = await Book.findByPk(id);
    if (!book) {
      throw new AppError(ERROR_CODES.MISSING_BOOK);
    }

    await book.update({
      title: title ?? book.title,
      author: author ?? book.author,
      description: description ?? book.description,
      price: price ?? book.price
    });

    res.json({
      message: "책 수정 완료",
      book
    });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/books/:id (ADMIN)
 */
export const deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;

    const book = await Book.findByPk(id);
    if (!book) {
      throw new AppError(ERROR_CODES.MISSING_BOOK);
    }

    await book.destroy();

    res.json({ message: "책 삭제 완료" });
  } catch (err) {
    next(err);
  }
};
