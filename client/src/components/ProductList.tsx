import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Ошибка загрузки товаров:', err));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard
          key={product.id}
          id={product.id}
          title={product.title}
          image={product.image}
          price={product.price}
        />
      ))}
    </div>
  );
};

export default ProductList;
