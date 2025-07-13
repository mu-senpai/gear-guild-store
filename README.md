# Qtech Store 🛒

A modern, full-stack tech-commerce application built with **Next.js 13 (client)** and **Node.js + Express (server)**.  
This monorepo contains both front-end and back-end codebases for seamless e-commerce experience.

---

## 📁 Repository Structure

```
qtech-store/
├── client/   # Frontend – Next.js 15 (App Router), Tailwind CSS, Redux, AntD
└── server/   # Backend – Node.js, Express, MongoDB, TypeScript
```

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/mu-senpai/qtec-task.git
cd qtec-task
```

### 2. Setup Backend (server)
```bash
cd server
cp .env.example .env      # Add MongoDB URI and JWT secret
npm install
npm run dev
```

### 3. Setup Frontend (client)
In a separate terminal:
```bash
cd client
cp .env.local.example .env.local   # Add API URL and other env vars
npm install
npm run dev
```

---

## 📚 Documentation

- [Frontend Docs](./client/README.md) – Next.js, Tailwind CSS, Redux, etc.
- [Backend Docs](./server/README.md) – REST API, MongoDB, Auth, etc.

---

## 🛠️ Tech Highlights

- **Next.js 13 App Router**
- **Tailwind CSS + Ant Design**
- **Redux Toolkit + RTK Query**
- **Node.js + Express + MongoDB**
- **JWT Authentication**
- **Framer Motion Animations**