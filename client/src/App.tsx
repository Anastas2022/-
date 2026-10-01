// src/App.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import Layout from './components/Layout';
import { useAuth } from './auth/AuthContext';
import CheckoutPage from './pages/CheckoutPage';
import RegisterPage from './pages/RegisterPage';

const App = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/profile"
          element={user ? <ProfilePage /> : <Navigate to="/login" replace />} />
        <Route
          path="/admin"
          element={user?.role === 'admin' ? <AdminPage /> : <Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
};

export default App;