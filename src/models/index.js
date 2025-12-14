import Sequelize from "sequelize";
import config from "../../config/config.cjs";

// 환경
const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

// Sequelize 인스턴스 생성
export const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: false
  }
);

// 모델 컨테이너
export const db = {};

// ===== 모델 import =====
import UserModel from "./user.js";
import BookModel from "./book.js";
import CartModel from "./cart.js";
import CartItemModel from "./cartItem.js";
import OrderModel from "./order.js";
import OrderItemModel from "./orderItem.js";
import ReviewModel from "./review.js";

// ===== 모델 초기화 =====
db.User = UserModel(sequelize, Sequelize.DataTypes);
db.Book = BookModel(sequelize, Sequelize.DataTypes);
db.Cart = CartModel(sequelize, Sequelize.DataTypes);
db.CartItem = CartItemModel(sequelize, Sequelize.DataTypes);
db.Order = OrderModel(sequelize, Sequelize.DataTypes);
db.OrderItem = OrderItemModel(sequelize, Sequelize.DataTypes);
db.Review = ReviewModel(sequelize, Sequelize.DataTypes);

// ===== 관계 설정 =====

// User
db.User.hasOne(db.Cart, { foreignKey: "userId" });
db.Cart.belongsTo(db.User, { foreignKey: "userId" });

db.User.hasMany(db.Order, { foreignKey: "userId" });
db.Order.belongsTo(db.User, { foreignKey: "userId" });

db.User.hasMany(db.Review, { foreignKey: "userId" });
db.Review.belongsTo(db.User, { foreignKey: "userId" });

// Cart
db.Cart.hasMany(db.CartItem, { foreignKey: "cartId" });
db.CartItem.belongsTo(db.Cart, { foreignKey: "cartId" });

db.Book.hasMany(db.CartItem, { foreignKey: "bookId" });
db.CartItem.belongsTo(db.Book, { foreignKey: "bookId" });

// Order
db.Order.hasMany(db.OrderItem, { foreignKey: "orderId" });
db.OrderItem.belongsTo(db.Order, { foreignKey: "orderId" });

db.Book.hasMany(db.OrderItem, { foreignKey: "bookId" });
db.OrderItem.belongsTo(db.Book, { foreignKey: "bookId" });

// Review
db.Book.hasMany(db.Review, { foreignKey: "bookId" });
db.Review.belongsTo(db.Book, { foreignKey: "bookId" });

// Sequelize export
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
