# 🛠️ DevCollab

DevCollab is a full-stack collaboration dashboard built for developers. It integrates project management features like Quick Links, task tracking, and more. This app is being developed as part of a full-stack skill refresh, with a focus on modern tooling, testing, and deployment workflows.

---

## 🚀 Features

- **Frontend**: React + TypeScript + Vite
- **Styling**: MUI (Material UI) + SCSS Modules
- **Backend**: Node.js + Express + Prisma ORM
- **Database**: Supabase PostgreSQL
- **Auth**: Supabase Auth (email/password)
- **Testing**: Jest + Supertest (server-side)
- **CI/CD**: GitHub Actions (auto-test on push)
- **Environment Management**: dotenv

---

## 🖥️ Project Structure

```
/client         - React frontend
/server         - Express backend (TypeScript)
/prisma         - Prisma schema & migrations
/routes         - Express route handlers
/middleware     - Token/session validation
/tests          - Backend unit/integration tests
```

---

## 🔧 Environment Setup

### Prerequisites

- Node.js v18+
- Supabase account (https://supabase.io)
- PostgreSQL connection (via Supabase or local)

---

### Environment Variables

#### `client/.env`

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_API_URL=http://localhost:5000
```

#### `server/.env`

```env
DATABASE_URL="your_postgres_connection_string"
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-secret
PORT=5000
```

---

## 📦 Scripts

### From root

```bash
# Start backend
cd server && npm run dev

# Start frontend
cd client && npm run dev
```

---

## 🧪 Running Tests (Server)

```bash
cd server
npm test
```

Tests use `jest`, `supertest`, and run automatically on `push` via GitHub Actions.

---

## 🔐 Auth Flow

- Authentication is handled by **Supabase Auth**
- Users login via email/password
- Session tokens are stored securely and sent to backend via Authorization headers
- Backend validates user identity via Supabase Admin API

---

## 📅 Roadmap (Upcoming)

- Quick Link creation/edit/delete
- Task + project views
- User-specific dashboards
- Responsive layout for mobile/tablet
- Dark/light mode toggle (already scaffolded)
- Full accessibility pass

---

## 🧠 Why This Exists

This project is part of a full-stack reboot, built from scratch with CI, testing, and DevOps in mind. It’s a hands-on way to revisit best practices in modern development.

---

## 📄 License

MIT
