import { Router } from 'express';
import passport from 'passport';
import { Strategy as SteamStrategy } from 'passport-steam';
import session from 'express-session';
import User from '../models/User';
import jwt from 'jsonwebtoken';

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const STEAM_API_KEY = process.env.STEAM_API_KEY!;
const STEAM_RETURN_URL = 'http://localhost:4000/api/auth/steam/return';
const STEAM_REALM = 'http://localhost:4000/';

passport.use(new SteamStrategy({
  returnURL: STEAM_RETURN_URL,
  realm: STEAM_REALM,
  apiKey: STEAM_API_KEY,
}, async (identifier, profile, done) => {
  const steamId = profile.id;
  let user = await User.findOne({ steamId });

  if (!user) {
    user = await User.create({
      name: profile.displayName,
      email: `steam_${steamId}@steam.fake`, // временный email
      steamId,
      role: 'user',
    });
  }

  return done(null, user);
}));

passport.serializeUser((user: any, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

// подключение сессий
router.use(session({
  secret: 'supersecret',
  resave: false,
  saveUninitialized: false,
}));


router.use(passport.initialize());
router.use(passport.session());

// инициируем переход в Steam
router.get('/steam', passport.authenticate('steam'));

// возвращаемся с токеном
router.get('/steam/return', passport.authenticate('steam', {
  failureRedirect: '/',
}), (req, res) => {
  const user = req.user as any;
  const token = jwt.sign({ id: user._id, name: user.name, role: user.role }, JWT_SECRET, {
    expiresIn: '7d',
  });

  res.redirect(`http://localhost:5173/login?token=${token}`);
});

export default router;
