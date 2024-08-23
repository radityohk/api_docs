"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          username: "Admin",
          fullname: "Admin",
          password: "123",
          role: "superadmin",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: "Owner",
          fullname: "Owner",
          password: "123",
          role: "owner",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: "Manager",
          fullname: "Manager",
          password: "123",
          role: "manager",
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    //
  },
};
