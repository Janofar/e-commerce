import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/database"; // Assuming your Sequelize instance is here
import Joi, { options } from 'joi';
import CategoryAttribute from "./CategoryAttribute";
export interface ICategory {
  id?: number;
  name: string;
  slug: string;
  parentId?: number | null; // Optional for top-level categories
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class Category extends Model<ICategory> {
  public id!: number;
  public name!: string;
  public slug!: string;
  public parentId!: number | null;
  public description!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    parentId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "categories",
  }
);
Category.hasMany(Category, { foreignKey: 'parentId' });
Category.belongsTo(Category, { foreignKey: 'parentId' });
Category.hasMany(CategoryAttribute, { foreignKey: 'categoryId', as: 'attributes' });
CategoryAttribute.belongsTo(Category, { foreignKey: 'categoryId' });

export const categorySchema = Joi.object({
  name: Joi.string().trim().min(3).max(255).required(),
  parentId: Joi.number().allow(null),
  description: Joi.string().allow("", null),
  attributes: Joi.array().items(
      Joi.object({
          id: Joi.number().optional(),
          name: Joi.string().required(),
          type: Joi.string().required(),
          options: Joi.array().items(Joi.string()).when('type', { is: 'select', then: Joi.required() })
      })
  ).default([])
});
export default Category;
