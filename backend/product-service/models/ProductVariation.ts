import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/database";
import CategoryAttribute from "./CategoryAttribute";

interface IProductVariation {
    id: number;
    productId: number;
    stock: number;
    price: number;
    attributeId : number;
    createdAt?: Date;
    updatedAt?: Date;
  }
  

  class ProductVariation extends Model<IProductVariation> {
    public id!: number;
    public productId!: number;
    public price!: number;
    public attributeId!: number;
  
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  
  ProductVariation.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      productId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      attributeId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
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
      tableName: "product_variations",
    }
  );
  ProductVariation.hasOne(CategoryAttribute, { foreignKey: 'attributeId' });
  export default ProductVariation;
  