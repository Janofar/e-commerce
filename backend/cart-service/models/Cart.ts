import { DataTypes, Model, Sequelize } from 'sequelize';
import User from '../../auth-service/models/User';
import sequelize from '../../config/database';
class Cart extends Model {
    public id!: number;
    public userId!: number;
    public productId!: number;
    public quantity!: number;
    public createdAt!: Date;
    public updatedAt!: Date;
  }
  
  Cart.init(
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
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'carts',
    }
  );
  Cart.belongsTo(User, { foreignKey: 'userId' });
  export default Cart;