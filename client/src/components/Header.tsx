// src/components/Header.tsx
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-zinc-900 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-lg">GameShop</Link>
        <div className="flex gap-4 items-center">
          <Link to="/cart">Корзина</Link>
          {user && <Link to="/profile">Профиль</Link>}
          {user?.role === 'admin' && <Link to="/admin">Админка</Link>}
          {user ? (
            <button onClick={logout} className="text-red-400 hover:text-red-300">Выйти</button>
          ) : (
            <Link to="/login">Вход</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;