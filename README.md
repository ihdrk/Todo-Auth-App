# 🔐 Todo Auth App

A full-stack Todo application with authentication built using **Node.js, Express, JWT, and vanilla JavaScript**.

Users can register, login, and manage their own todos securely using JSON file storage.

---

## 🚀 Features

### 🔑 Authentication
- User Registration (hashed passwords with bcrypt)
- User Login (JWT-based authentication)
- Protected Routes using middleware
- Token stored in localStorage
- Auto logout on invalid/expired token

### ✅ Todo Management
- Create todos
- View only your own todos
- Mark as complete / undo
- Delete todos
- Protected per-user access

### 🎨 Frontend
- Clean responsive UI
- Login / Register toggle
- Styled with custom CSS
- Dynamic todo rendering

---

## 🏗️ Project Structure

```
todo-auth-app/
├── data/
│   ├── users.json
│   └── todos.json
├── routes/
│   ├── auth.js
│   └── todos.js
├── middleware/
│   └── auth.js
├── public/
│   ├── index.html
│   ├── todos.html
│   ├── app.js
│   ├── todos.js
│   └── style.css
├── utils/
│   └── fileHelpers.js
├── server.js
├── package.json
└── README.md
```

---

## 🛠️ Technologies Used

- Node.js
- Express.js
- JWT (jsonwebtoken)
- bcrypt
- HTML
- CSS
- Vanilla JavaScript
- JSON file storage

---

## 📦 Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/ihdrk/todo-auth-app.git
cd todo-auth-app
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run the server

```bash
node server.js
```

Server will run on:

```
http://localhost:3000
```

---

## 🔐 How Authentication Works

1. User registers → password is hashed with bcrypt.
2. User logs in → JWT token is generated.
3. Token is stored in localStorage.
4. Protected routes verify token using middleware.
5. Users can only access their own todos.

---

## 📌 API Endpoints

### Auth Routes

| Method | Route | Description |
|--------|-------|------------|
| POST | /auth/register | Register new user |
| POST | /auth/login | Login user |

### Todo Routes (Protected)

| Method | Route | Description |
|--------|-------|------------|
| GET | /todos | Get all user's todos |
| POST | /todos | Create new todo |
| PUT | /todos/:id | Update todo |
| DELETE | /todos/:id | Delete todo |

---

## ⚠️ Notes

- This project uses JSON files as a database (for learning purposes).
- JWT secret is hardcoded for development.
- Not production-ready (no refresh tokens, no database).

---

## 📚 Learning Purpose

This project demonstrates:
- Authentication flow
- Middleware usage
- REST API design
- Frontend + backend integration
- File-based data persistence
- Full CRUD functionality

---

## 👤 Author

Built by Abdulaziz Alsharafi

---

## ⭐ Future Improvements

- Add MongoDB or PostgreSQL
- Add password validation rules
- Add edit todo title feature in UI
- Deploy to Render / Railway
- Add refresh tokens
- Add user profile page

---

