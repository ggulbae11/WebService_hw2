"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface) {
    const users = [];

    // ADMIN
    users.push({
      email: "admin@test.com",
      password: bcrypt.hashSync("1234", 10),
      role: "ADMIN",
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // USERS 50명
    for (let i = 1; i <= 50; i++) {
      users.push({
        email: `user${i}@test.com`,
        password: bcrypt.hashSync("1234", 10),
        role: "USER",
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert("Users", users);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Users", null, {});
  }
};
