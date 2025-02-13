'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('product_variations', 'response', {
      type: Sequelize.JSON,
      allowNull: true,
      after: 'attributeId',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('product_variations', 'response');
  }
};
