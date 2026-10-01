# GameStore — интернет-магазин для геймеров 🎮

Полноценный интернет-магазин с каталогом игр, корзиной, оформлением заказов, личным кабинетом и админкой.  
Реализована авторизация по email и паролю, сохранение заказов, защита по ролям (user/admin).

---

## 📦 Стек

- **Frontend**: React + TypeScript + TailwindCSS + React Router + Vite
- **Backend**: Node.js + Express + TypeScript + MongoDB (Mongoose)
- **Auth**: JWT (вход, регистрация, админ-доступ)
- **База данных**: MongoDB

---

## 🚀 Быстрый старт (локально)

### 1. Клонируй проект

Если проект передан архивом:
```bash
unzip magazin.zip
cd magazin


2. Установка зависимостей
Backend:
cd server
npm install


Frontend:
cd client/client
npm install


3. Настрой .env
PORT=4000
MONGO_URI=mongodb://localhost:27017/gamestore
JWT_SECRET=supersecret


PORT=4000
MONGO_URI=mongodb://localhost:27017/gamestore
JWT_SECRET=supersecret


4. Запуск
Backend:
cd server
npm run dev

Frontend:
cd client/client
npm run dev

Frontend откроется на http://localhost:5173

Backend слушает http://localhost:4000


🧑‍💼 Админ-доступ
Чтобы войти в админку:

В MongoDB в коллекции users вручную добавь документ:

{
  "name": "Admin",
  "email": "admin@example.com",
  "password": "$2b$10$qK98qA3duBtTIO1K0VJmGe.Dxq7nUJbL9G8YEVbXOBphYRCV9U4E6",
  "role": "admin"
}


Вход:
Email: admin@example.com
Пароль: admin123

💡 Функциональность
📚 Каталог товаров с фильтрацией

🛒 Корзина с сохранением в localStorage

🧾 Оформление заказа

👤 Личный кабинет

🔐 Авторизация, регистрация

🛠 Админ-панель для управления товарами и заказами

📁 Структура
/client         — фронтенд (React)
/server         — бэкенд (Express + MongoDB)
/mongo-init     — (опционально) начальные данные

