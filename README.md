# 📝 Task Manager App

![Image](https://github.com/user-attachments/assets/a8aed225-98e9-4ef7-876d-48636474a00b)

A full-stack **Task Manager** built with the **MERN** stack (MongoDB, Express, React, Node.js) that allows users to manage their daily tasks efficiently. This app includes user authentication, task CRUD operations, inline editing, and a clean, responsive UI.

---

## 🚀 Features

### 🔐 Authentication
- User **Signup** and **Login** functionality.
- **JWT-based authentication** with secure token handling.
- Protected routes for authenticated users only.
- **Logout** feature to end sessions securely.

### ✅ Task Management
- **Create** new tasks with a title and description.
- **Read** and display tasks in a user-friendly UI.
- **Update/Edit** tasks using an inline editing feature.
- **Delete** tasks when they are no longer needed.
- Each task is associated with the logged-in user.

### 🖥️ Frontend
- Built with **React.js** and **Material UI (MUI)** for a modern look and feel.
- **React Router** used for client-side routing (Login, Register, Home).
- **Context API** for managing user authentication and app-wide state.
- Conditional rendering of buttons like **Login**, **Logout**, and **Register** based on user state.

### 🌐 Backend
- Built with **Node.js** and **Express.js**.
- **MongoDB** and **Mongoose** for data storage.
- **bcryptjs** for secure password hashing.
- **JWT** for handling user sessions.
- Middleware to protect task routes and validate users.

---

## Installation
### Backend setup
- cd backend
- npm install
- nodemon server

### Frontend setup
- cd ../frontend
- npm install
- npm run dev

### 🔐 Environment Variables
- PORT=1000
- MONGO_URI=your_mongodb_uri
- JWT_SECRET=your_jwt_secret

