// src/server.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import productRoutes from './routes/product.routes';
import orderRoutes from './routes/orderRoutes';
import authRoutes from './routes/auth';
import steamAuthRoutes from './routes/auth.steam';

dotenv.config();

const app = express(); // ✅ Вот это и есть app

mongoose.connect(process.env.MONGO_URI || '')
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB error:', err);
    process.exit(1);
  });

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());

// ✅ Подключение маршрутов (все через Router)
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/auth', steamAuthRoutes);

app.get('/', (_, res) => {
  res.send('Backend API is running');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
