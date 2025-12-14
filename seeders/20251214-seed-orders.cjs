"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const orders = [];

    for (let i = 1; i <= 50; i++) {
      orders.push({
        userId: (i % 5) + 1,
        status: "PAID",
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert("Orders", orders);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Orders", null, {});
  }
};
