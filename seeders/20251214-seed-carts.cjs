"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const carts = [];

    for (let i = 1; i <= 20; i++) {
      carts.push({
        userId: (i % 5) + 1,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert("Carts", carts);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Carts", null, {});
  }
};
