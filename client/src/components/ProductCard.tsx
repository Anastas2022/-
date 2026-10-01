import { useCart } from '../cart/CartContext';

interface ProductCardProps {
  id: string;
  title: string;
  image: string;
  price: number;
}

const ProductCard = ({ id, title, image, price }: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <div className="border rounded shadow hover:shadow-lg p-4">
      <img src={image} alt={title} className="w-full h-40 object-cover rounded mb-2" />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-blue-600 font-bold">{price} ₽</p>
      <button
        onClick={() => addToCart({ id: Number(id), title, image, price })}
        className="mt-2 w-full bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700"
      >
        В корзину
      </button>
    </div>
  );
};

export default ProductCard;
