import db from "../models/index.js";

const User = db.User;
const Order = db.Order;

export const getStats = async (req, res) => {
  const totalUsers = await User.count();
  const totalOrders = await Order.count();

  res.json({
    totalUsers,
    totalOrders
  });
};
