// src/pages/CartPage.tsx
import { useCart } from '../cart/CartContext';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Корзина пуста');
      return;
    }
    navigate('/checkout');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Корзина</h1>
      {cart.map(item => (
        <div key={item.id} className="flex justify-between items-center border-b py-2">
          <div>
            <p className="font-semibold">{item.title}</p>
            <p className="text-sm text-gray-500">Цена: {item.price} ₽ × {item.quantity}</p>
          </div>
          <button onClick={() => removeFromCart(item.id)} className="text-red-500">Удалить</button>
        </div>
      ))}
      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={clearCart}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Очистить корзину
        </button>
        <button
          onClick={handleCheckout}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Оформить заказ
        </button>
      </div>
    </div>
  );
};

export default CartPage;
