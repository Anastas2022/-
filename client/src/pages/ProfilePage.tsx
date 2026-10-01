// src/pages/ProfilePage.tsx
import { useAuth } from '../auth/AuthContext';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Личный кабинет</h1>

      {user ? (
        <>
          <p className="mb-2 text-gray-700"><strong>Имя:</strong> {user.name}</p>
          <p className="mb-6 text-gray-700"><strong>Роль:</strong> {user.role}</p>

          <h2 className="text-xl font-semibold mb-2">История заказов</h2>
          <p className="text-gray-500">История заказов пока пуста.</p>
        </>
      ) : (
        <p className="text-red-500">Ошибка: пользователь не авторизован.</p>
      )}
    </div>
  );
};

export default ProfilePage;
