import { DataTypes, Model } from 'sequelize';
import User from '../../auth-service/models/User';
import sequelize from '../../config/database';
class Order extends Model {
    public id!: number;
    public userId!: number;
    public totalAmount!: number;
    public status!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
  }
  
  Order.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User,
          key: 'id',
        },
      },
      totalAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'orders',
    }
  );
  Order.belongsTo(User, { foreignKey: 'userId' });
  export default Order;