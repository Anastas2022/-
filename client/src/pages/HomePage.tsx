// src/pages/HomePage.tsx
import ProductList from '../components/ProductList';

const HomePage = () => (
  <div>
    <h1 className="text-2xl font-bold mb-6">Каталог товаров</h1>
    <ProductList />
  </div>
);

export default HomePage;