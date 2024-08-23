'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "menus",
      [
        {
          name: "Nasi Telur",
          price: 8000,
          isRecommendation: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Es Teh",
          price: 3000,
          isRecommendation: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
