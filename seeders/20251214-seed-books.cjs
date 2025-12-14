"use strict";

module.exports = {
  async up(queryInterface) {
    const books = [];

    for (let i = 1; i <= 100; i++) {
      books.push({
        title: `테스트 도서 ${i}`,
        author: `저자 ${i}`,
        description: `설명 ${i}`,
        price: 10000 + i * 100,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert("Books", books);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Books", null, {});
  }
};
