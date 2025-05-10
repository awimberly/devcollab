# DevCollab 🧠💬

A full-stack developer collaboration platform with secure authentication, modular architecture, and built-in CI/CD.

> 🔐 Designed with best practices in mind: tested, documented, and production-ready.

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/awimberly/devcollab/test.yml?branch=main)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/node-18%2B-brightgreen)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

📖 See [CHANGELOG.md](./CHANGELOG.md) for version history.

---

## 🛠 Tech Stack

- **Frontend**: React + Vite
- **Backend**: Node.js + Express + Prisma
- **Database**: Supabase PostgreSQL
- **Auth**: JWT + bcrypt
- **Testing**: Jest + Supertest
- **CI**: GitHub Actions

---

## 🔧 Prerequisites

- Node.js 18+
- PostgreSQL or Supabase project
- `.env` file configured

---

## 📁 Folder Structure

```
devcollab/
├── client/              # Frontend React app
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── data/
│       ├── hooks/
│       └── styles/
├── server/              # Backend API
│   └── src/
│       ├── controllers/
│       ├── middleware/
│       ├── routes/
│       ├── __tests__/
│       └── utils/
│   ├── prisma/
│   ├── app.ts
│   ├── server.ts
│   └── .env
```

---

## ⚙️ Environment Setup

Create a `.env` file inside `/server` with the following:

```env
DATABASE_URL="your_postgres_connection_string"
JWT_SECRET="your_super_secure_secret"
PORT=5000
```

---

## 🚀 Running the App

### Backend
```bash
cd server
npm install
npx prisma generate
npx prisma db push
npm run dev
```

### Frontend
```bash
cd client
npm install
npm run dev
```

---

## 🔐 Auth Routes

| Route                 | Method | Description          |
|----------------------|--------|----------------------|
| `/api/auth/register` | POST   | Register new user    |
| `/api/auth/login`    | POST   | Login + get JWT      |

Use `Authorization: Bearer <token>` in protected requests.

---

## 🧪 Running Tests

Inside `/server`, run:

```bash
npx jest
```

### What’s tested?

- ✅ `/api/auth/register` - success and duplicate emails
- ✅ `/api/auth/login` - valid and invalid credentials

---

## ✅ GitHub Actions CI

Automatically runs tests on push or pull request to [main, develop] branches.

See [`test.yml`](.github/workflows/test.yml)

---

## 📄 License

MIT — use it, remix it, build with it.