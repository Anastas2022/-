// src/routes/auth.ts
import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

router.post('/register', async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ error: 'Email уже используется' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });

  res.status(201).json({ message: 'Пользователь создан', user });
});

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Неверные данные' });
  }

 const token = jwt.sign(
  { id: user._id, name: user.name, role: user.role },
  JWT_SECRET,
  { expiresIn: '7d' }
);
  res.json({ token });
  res.status(201).json({ message: 'Пользователь создан', token }); 
});

router.get('/me', async (req: Request, res: Response) => {
  const auth = req.headers.authorization;
  if (!auth) return res.sendStatus(401);

  try {
    const token = auth.split(' ')[1];
    const payload = jwt.verify(token, JWT_SECRET);
    res.json(payload);
  } catch {
    res.sendStatus(401);
  }
});

export default router;
