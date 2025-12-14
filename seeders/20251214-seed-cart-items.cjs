"use strict";

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("cart_items", [
      {
        cartId: 1,
        bookId: 1,
        qty: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        cartId: 1,
        bookId: 2,
        qty: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("cart_items", null, {});
  }
};

        