import db from "../models/index.js";
import { AppError } from "../errors/AppError.js";
import { ERROR_CODES } from "../constants/errorCodes.js";

const Cart = db.Cart;
const CartItem = db.CartItem;
const Book = db.Book;

export const getMyCart = async (req, res) => {
  const cart = await Cart.findOne({
    where: { userId: req.user.id },
    include: [
      {
        model: CartItem,
        include: [Book]
      }
    ]
  });

  res.json(cart ?? { items: [] });
};

export const addToCart = async (req, res) => {
  const { bookId, qty } = req.body;
  const userId = req.user.id;

  let cart = await Cart.findOne({
    where: { userId },
    
  });
  if (!cart) cart = await Cart.create({ userId });

  await CartItem.create({
    cartId: cart.id,
    bookId,
    qty
  });

  res.json({ message: "장바구니에 추가됨" });
};

export const updateCartItem = async (req, res) => {
  const { bookId, qty } = req.body;
  const cart = await Cart.findOne({ where: { userId: req.user.id }});
  if (!cart) throw new AppError(ERROR_CODES.MISSING_CART);

  const item = await CartItem.findOne({
    where: { cartId: cart.id, bookId }
  });
  if (!item) throw new AppError(ERROR_CODES.MISSING_CART);

  await item.update({ qty });
  res.json({ message: "수량 수정됨" });
};

export const removeFromCart = async (req, res) => {
  const cart = await Cart.findOne({ where: { userId: req.user.id }});
  if (!cart) throw new AppError(ERROR_CODES.MISSING_CART);

  await CartItem.destroy({
    where: { cartId: cart.id, bookId: req.body.bookId }
  });

  res.json({ message: "장바구니에서 제거됨" });
};

export const clearCart = async (req, res) => {
  const cart = await Cart.findOne({ where: { userId: req.user.id }});
  if (!cart) throw new AppError(ERROR_CODES.MISSING_CART);

  await CartItem.destroy({ where: { cartId: cart.id } });
  res.json({ message: "장바구니 비워짐" });
};
