# DevCollab 🧠💬
A full-stack collaboration app with secure authentication, built using:

- React + Vite (frontend)
- Node.js, Express, and Prisma (backend)
- Supabase PostgreSQL (database)
- JWT Auth + bcrypt for login security
- Jest + Supertest for testing
- GitHub Actions for CI

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
|   ├── src/
|       ├── assets/
|       ├── components/
|       ├── data/
|       ├── hooks/
|       ├── styles/
├── server/              # Backend API
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── __tests__/
│   │   └── utils/
│   ├── prisma/
│   ├── app.ts
│   ├── server.ts
│   └── .env
```

---

## ⚙️ Environment Setup

Create a `.env` file inside `/server` with the following:

```
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

| Route               | Method | Description              |
|--------------------|--------|--------------------------|
| `/api/auth/register` | POST   | Register new user        |
| `/api/auth/login`    | POST   | Login + get JWT          |
| `/api/auth/protected`| GET    | Requires valid token     |

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
- ✅ `/api/auth/protected` - access granted and denied
- ✅ Password hashing and token issuance

---

## ✅ GitHub Actions CI

Automatically runs tests on push or pull request to `main`.

See `.github/workflows/test.yml`

---

## 📄 License

MIT — use it, remix it, build with it.
