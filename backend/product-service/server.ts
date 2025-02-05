import express from 'express';
import cors from 'cors';
import  sequelize  from '../config/database';
import productRoutes from './routes/productRoutes';
import categoryRoutes from './routes/categoryRoutes';

const app = express();
const port = process.env.PRODUCT_SERVICE_PORT || 3003;
app.use(cors({
  allowedHeaders: ['Content-Type', 'Authorization'],
  origin: '*',
}));
app.use(express.json());
(async () => {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  })();

app.use('/api/products', productRoutes);
app.use('/api/categories',categoryRoutes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
