import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/database";
import Category from "./Category";

export interface IProduct {
  id?: number;
  name: string;
  slug: string;
  description?: string;
  price: number;
  stock : number
  currency : string;
  categoryId: number;
  imagePaths?: string[] | null;
  createdAt?: Date;
  updatedAt?: Date;
}

class Product extends Model<IProduct> {
  public id!: number;
  public name!: string;
  public slug!: string;
  public description!: string;
  public price!: number;
  public stock!: number;
  public currency!: string;
  public categoryId!: number;
  public imagePaths!: string[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init(
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
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    imagePaths: {
      type: DataTypes.JSON,
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
    tableName: "products",
  }
);
Product.belongsTo(Category, { foreignKey: 'categoryId' });
export default Product;
