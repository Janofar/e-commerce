import express from 'express';
import  sequelize  from '../config/database';
import authRoutes from './routes/authRoutes';

const app = express();
const port = process.env.AUTH_SERVICE_PORT || 3000;

app.use(express.json());
(async () => {
    try {
      await sequelize.authenticate(); // Test connection
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  })();

app.use('/api/users', authRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
