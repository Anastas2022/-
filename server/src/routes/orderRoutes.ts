// src/routes/orderRoutes.ts
import { Router } from 'express';
import {Order} from '../models/Order';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { customer, items } = req.body;
    const order = await Order.create({ customer, items });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при оформлении заказа' });
  }
});

router.get('/', async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

export default router;
