# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.3.0] - 2025-05-14
### Changed
- Replaced custom JWT/bcrypt-based authentication with Supabase Auth
- Removed `AuthContext`, legacy token logic, and backend `verifyToken` middleware
- Switched to secure session handling via Supabase access token
- Wrapped frontend in `<BrowserRouter>` to enable navigation
- Added Logout functionality using Supabase signOut
- Improved layout of QuickLinks dashboard
- Added favicon and minor SCSS polish for dashboard appearance

## [0.2.0] - 2025-05-10
### Added
- Login form UI with MUI styling
- Context-based authentication with 'AuthProvider'
- Frontend token management and validation
- Redirect to dashboard after login

### [0.1.1](https://github.com/awimberly/devcollab/compare/v0.1.0...v0.1.1) (2025-05-08)

### Added
- `POST /api/auth/register` route with input validation and hashed password creation
- `POST /api/auth/login` route with JWT token generation using environment variable
- Unit tests for register and login using mocked Prisma, bcrypt, and JWT

### Changed
- Login controller now returns a unified 401 response for invalid email or password
- Test files now set `process.env.JWT_SECRET` to avoid missing env error

### Removed
- Deleted `appSanity.test.ts` (covered by route-level tests)

## [0.1.0] - 2025-05-06

### Added
- Initialized Express backend server
- Set up Prisma ORM with initial schema and database connection
- Created basic authentication routes (`/login` and `/register`)
- Added unit tests for core backend logic
- Configured GitHub Actions CI (`test.yml`) to run tests on push and PR
