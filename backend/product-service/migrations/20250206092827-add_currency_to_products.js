'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'currency', {
      type: Sequelize.STRING(3),
      allowNull: true,
      after : 'price'
    });
    await queryInterface.addColumn('products', 'imagePaths', {
      type: Sequelize.JSON,
      allowNull: true,
      after: 'description',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('products', 'currency');
    await queryInterface.removeColumn('products', 'imagePaths');
  }
};
