import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../cart/CartContext';

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    paymentMethod: 'card',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.address) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    const order = {
      items: cart,
      customer: form,
    };

    try {
      const res = await fetch('http://localhost:4000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });

      if (!res.ok) throw new Error('Ошибка при оформлении');

      clearCart();
      alert('Заказ успешно оформлен!');
      navigate('/');
    } catch (err) {
      alert(`Ошибка: ${(err as Error).message}`);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-4">Оформление заказа</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Имя"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="address"
          placeholder="Адрес доставки"
          value={form.address}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <select
          name="paymentMethod"
          value={form.paymentMethod}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="card">Карта</option>
          <option value="paypal">PayPal</option>
        </select>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Подтвердить заказ
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
