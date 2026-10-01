import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product';

dotenv.config();

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI!);

  await Product.deleteMany();

  await Product.insertMany([
    { title: 'Steam Key: Cyberpunk 2077', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg', price: 2999 },
    { title: 'Steam Key: Elden Ring', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg', price: 3999 },
    { title: 'Steam Key: GTA V Premium', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg', price: 1899 },
    { title: 'Dota Plus подписка 6 мес.', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react//icons/dota_plus_logo.png', price: 1199 },
    { title: 'CS:GO Prime Upgrade', image: 'https://cdn.cloudflare.steamstatic.com/apps/csgo/images/csgo_react/cs2_header.jpg', price: 1499 },
    { title: 'The Witcher 3: Wild Hunt', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg', price: 899 },
    { title: 'Hogwarts Legacy', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/990080/header.jpg', price: 4499 },
    { title: 'Red Dead Redemption 2', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg', price: 3299 },
    { title: 'Steam Wallet 1000₽', image: 'https://cdn.akamai.steamstatic.com/store/promo/wallet_card.png', price: 1000 },
    { title: 'Among Us Steam Key', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/945360/header.jpg', price: 149 }
  ]);

  console.log('✅ Products seeded');
  process.exit();
};

seed();
