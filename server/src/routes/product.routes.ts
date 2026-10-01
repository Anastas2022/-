import { Router } from 'express';
import Product from '../models/Product';

const router = Router();

router.get('/', async (_, res) => {
  const products = await Product.find();
  res.json(products);
});

router.post('/', async (req, res) => {
  try {
    const { title, image, price } = req.body;
    const product = await Product.create({ title, image, price });
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: 'Ошибка при добавлении товара' });
  }
});


export default router;
