'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint("category_attributes", {
      fields: ["categoryId", "name"],//for every category id, name should be unique
      type: "unique",
      name: "unique_category_name_constraint",
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint("category_attributes", "unique_category_name_constraint");
  }
};
