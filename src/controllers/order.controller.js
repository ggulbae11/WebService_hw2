import db from "../models/index.js";
import { AppError } from "../errors/AppError.js";
import { ERROR_CODES } from "../constants/errorCodes.js";

const Order = db.Order;
const OrderItem = db.OrderItem;
const Cart = db.Cart;
const CartItem = db.CartItem;

export const createOrder = async (req, res) => {
  const userId = req.user.id;
  const cart = await Cart.findOne({
    where: { userId }
  });

  if (!cart || cart.CartItems.length === 0) {
    throw new AppError(ERROR_CODES.EMPTY_CART);
  }

  const order = await Order.create({ userId, status: "PAID" });

  for (const item of cart.CartItems) {
    await OrderItem.create({
      orderId: order.id,
      bookId: item.bookId,
      qty: item.qty
    });
  }

  await CartItem.destroy({ where: { cartId: cart.id } });

  res.json({ message: "주문 생성됨", order });
};

export const getMyOrders = async (req, res) => {
  const orders = await Order.findAll({ where: { userId: req.user.id } });
  res.json(orders);
};

export const getOrderById = async (req, res) => {
  const order = await Order.findByPk(req.params.id, {
    include: [OrderItem]
  });
  if (!order) throw new AppError(ERROR_CODES.MISSING_ORDER);
  res.json(order);
};

export const cancelOrder = async (req, res) => {
  const order = await Order.findOne({
    where: { id: req.params.id, userId: req.user.id }
    
  });
  if (!order) throw new AppError(ERROR_CODES.MISSING_ORDER);

  await order.update({ status: "CANCELLED" });
  res.json({ message: "주문 취소됨", order });
};
