import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Review = sequelize.define("Review", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      bookId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Books",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
  });

  return Review;
};
