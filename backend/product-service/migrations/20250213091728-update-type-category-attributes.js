'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('category_attributes', 'type', {
      type: Sequelize.ENUM('text', 'number', 'select', 'radio','checkbox'),
      allowNull: false
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('category_attributes', 'type');
  }
};
