import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';
import Order from '../../order-service/models/Order';
import Cart from '../../cart-service/models/Cart';

class User extends Model {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public role!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'seller', 'buyer'),
      defaultValue: 'buyer',
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
  }
);
User.hasMany(Order, { foreignKey: 'userId' });
User.hasMany(Cart, { foreignKey: 'userId' });
export default User;
