import express from 'express';
import  sequelize  from '../config/database';
import cartRoutes from './routes/cartRoutes';

const app = express();
const port = process.env.CART_SERVICE_PORT || 3001;

app.use(express.json());
(async () => {
    try {
      await sequelize.authenticate(); // Test connection
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  })();

app.use('/api/carts', cartRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
