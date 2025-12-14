"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const reviews = [];

    for (let i = 1; i <= 100; i++) {
      reviews.push({
        bookId: (i % 10) + 1,
        userId: (i % 5) + 1,
        rating: (i % 5) + 1,
        content: `리뷰 내용 ${i}`,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert("Reviews", reviews);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Reviews", null, {});
  }
};
