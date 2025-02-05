import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/database";
import Category from "./Category";

export interface ICategoryAttribute {
    id?: number;
    categoryId: number;
    name: string;
    type: string;
    options?: string[]; // JSON array for select options
    createdAt?: Date;
    updatedAt?: Date;
  }
  

  class CategoryAttribute extends Model<ICategoryAttribute>  {
    public id!: number;
    public categoryId!: number;
    public name!: string;
    public type!: string;
    public options!: string[];
  
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  
  CategoryAttribute.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      categoryId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("text", "number", "select"),
        allowNull: false,
      },
      options: {
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
      tableName: "category_attributes",
      indexes: [
        {
          unique: true,
          fields: ["categoryId", "name"],
        },
      ],
    }
  );
    export default CategoryAttribute;
  