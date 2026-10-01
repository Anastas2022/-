import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const RegisterPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = await fetch('http://localhost:4000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'Ошибка регистрации');
      return;
    }

    if (data.token) {
      login(data.token);
      navigate('/profile'); // переход в личный кабинет
    } else {
      navigate('/login'); // fallback если токена нет
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">Регистрация</h1>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          required
          placeholder="Имя"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="password"
          name="password"
          required
          placeholder="Пароль"
          value={form.password}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
