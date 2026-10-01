// src/pages/AdminPage.tsx
import { useEffect, useState } from 'react';

interface Product {
  _id: string;
  title: string;
  image: string;
  price: number;
}

interface Order {
  _id: string;
  customer: {
    name: string;
    email: string;
    address: string;
    paymentMethod: string;
  };
  items: {
    id: number;
    title: string;
    price: number;
    quantity: number;
  }[];
  createdAt: string;
}

const AdminPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({ title: '', image: '', price: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetch('http://localhost:4000/api/orders')
      .then(res => res.json())
      .then(setOrders);

    fetch('http://localhost:4000/api/products')
      .then(res => res.json())
      .then(setProducts);
  }, []);

  const addProduct = async () => {
    if (!form.title || !form.image || !form.price) return;

    const res = await fetch('http://localhost:4000/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: form.title,
        image: form.image,
        price: parseFloat(form.price),
      }),
    });

    const newProduct = await res.json();
    setProducts(prev => [...prev, newProduct]);
    setForm({ title: '', image: '', price: '' });
  };

  const deleteProduct = async (_id: string) => {
    await fetch(`http://localhost:4000/api/products/${_id}`, {
      method: 'DELETE',
    });
    setProducts(prev => prev.filter(p => p._id !== _id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-4">Админ-панель</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Название"
            className="border rounded px-3 py-2"
          />
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Ссылка на изображение"
            className="border rounded px-3 py-2"
          />
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Цена"
            className="border rounded px-3 py-2"
          />
          <button
            onClick={addProduct}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 md:col-span-3"
          >
            Добавить товар
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map(p => (
            <div key={p._id} className="border rounded p-4 flex items-center gap-4">
              <img src={p.image} alt={p.title} className="w-24 h-24 object-cover rounded" />
              <div className="flex-1">
                <h3 className="font-bold">{p.title}</h3>
                <p>{p.price} ₽</p>
              </div>
              <button
                onClick={() => deleteProduct(p._id)}
                className="text-red-600 hover:underline"
              >
                Удалить
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-bold mb-4">Заказы</h1>
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order._id} className="border rounded p-4 shadow">
              <p className="font-semibold">Покупатель: {order.customer.name}</p>
              <p>Email: {order.customer.email}</p>
              <p>Адрес: {order.customer.address}</p>
              <p>Метод оплаты: {order.customer.paymentMethod}</p>
              <p className="font-medium mt-2">Товары:</p>
              <ul className="list-disc ml-5">
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.title} — {item.quantity} шт. по {item.price}₽
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-500 mt-2">
                Заказ создан: {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
