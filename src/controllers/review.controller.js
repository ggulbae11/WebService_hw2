import db from "../models/index.js";
import { AppError } from "../errors/AppError.js";
import { ERROR_CODES } from "../constants/errorCodes.js";

const Review = db.Review;
const Book = db.Book;

export const createReview = async (req, res) => {
  const { bookId, rating, content } = req.body;

  const book = await Book.findByPk(bookId);
  if (!book) throw new AppError(ERROR_CODES.MISSING_BOOK);

  const review = await Review.create({
    bookId,
    userId: req.user.id,
    rating,
    content
  });

  res.json({ message: "리뷰 생성됨", review });
};

export const getBookReviews = async (req, res) => {
  const reviews = await Review.findAll({
    where: { bookId: req.params.bookId },
    include: [User]
  });
  res.json(reviews);
};

export const updateReview = async (req, res) => {
  const review = await Review.findOne({
    where: { id: req.params.id, userId: req.user.id },
    include: [User]
  });
  if (!review) throw new AppError(ERROR_CODES.MISSING_REVIEW);

  await review.update(req.body);
  res.json({ message: "리뷰 수정됨", review });
};

export const deleteReview = async (req, res) => {
  const review = await Review.findOne({
    where: { id: req.params.id, userId: req.user.id }
  });
  if (!review) throw new AppError(ERROR_CODES.MISSING_REVIEW);

  await review.destroy();
  res.json({ message: "리뷰 삭제됨" });
};
