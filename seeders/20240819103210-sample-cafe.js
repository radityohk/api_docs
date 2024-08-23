"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "cafes",
      [
        {
          name: "Mekar Jaya",
          address: "Jl. Soekarno Hatta",
          phoneNumber: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Jasa Ayah",
          address: "Jl. Ciliwung",
          phoneNumber: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    //
  },
};
