import express from 'express';
import  sequelize  from '../config/database';
import orderRoutes from './routes/orderRoutes';

const app = express();
const port = process.env.ORDER_SERVICE_PORT || 3002;

app.use(express.json());
(async () => {
    try {
      await sequelize.authenticate(); // Test connection
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  })();

app.use('/api/orders', orderRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
