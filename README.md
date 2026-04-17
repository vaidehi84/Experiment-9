# Experiment 9 — Frontend Integration with RBAC (React + Session-Based UI)

**Student Name:** Vaidehi Sharma  
**Course:** FullStack Development 2026  

---

## Project Overview

This project implements a **React frontend** integrated with the **Role-Based Access Control (RBAC) Spring Boot backend** from Experiment 7.

The frontend supports two roles:
- `ADMIN` — full access to admin and user endpoints, sees all UI controls
- `USER` — restricted to user-level endpoints only, admin controls hidden

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Router v6 |
| UI Library | Material UI (MUI) v5 + Bootstrap 5 |
| HTTP Client | Axios |
| Auth Storage | sessionStorage |
| Backend | Spring Boot 3.2 + Spring Security + JWT |

---

## Project Structure

```
Vaidehi_Exp9/
├── backend/                          ← Spring Boot RBAC backend (from Exp 7)
│   ├── src/
│   │   └── main/java/com/example/jwt_demo/
│   │       ├── controllers/
│   │       │   ├── AuthController.java    ← /login, /logout, /protected
│   │       │   ├── AdminController.java   ← /admin/** (ADMIN only)
│   │       │   └── UserController.java    ← /user/** (USER + ADMIN)
│   │       ├── security/
│   │       │   ├── JwtUtil.java
│   │       │   ├── JwtFilter.java
│   │       │   ├── SecurityConfig.java
│   │       │   └── TokenBlacklist.java
│   │       └── JwtDemoApplication.java
│   └── pom.xml
│
├── frontend/                         ← React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js              ← Login form with MUI
│   │   │   ├── UserDashboard.js      ← User role dashboard
│   │   │   └── AdminDashboard.js     ← Admin role dashboard
│   │   ├── App.js                    ← Router + ProtectedRoute
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   └── .gitignore
│
├── screenshots/                      ← Required screenshots
├── README.md
└── .gitignore
```

---

## Features Implemented

### 1. Login Page
- Username & password input with show/hide toggle
- Calls `POST /login` on backend
- Stores `token`, `role`, `user` in `sessionStorage`
- Redirects: `ADMIN → /admin`, `USER → /user`
- Shows error on invalid credentials

### 2. User Dashboard
- Accessible by `USER` and `ADMIN` roles
- Calls `GET /user/profile` with Bearer token → shows response
- Demonstrates `403 Forbidden` when trying to access admin endpoint
- Displays session storage contents

### 3. Admin Dashboard
- Accessible by `ADMIN` role only
- Full access: `/admin/dashboard` + `/user/profile`
- Role-based UI: shows admin-only controls hidden from USER
- Displays session storage contents

### 4. Role-Based UI Control
- `USER` sees user buttons only; admin button visible but returns 403 to show enforcement
- `ADMIN` sees both user and admin controls

### 5. Logout
- Calls `POST /logout` to invalidate JWT on backend
- Clears `sessionStorage` completely
- Redirects to login

### 6. Route Protection
- `ProtectedRoute` in `App.js` guards `/user` and `/admin`
- No token → redirect to `/`
- Wrong role → redirect to own dashboard

---

## How to Run

### Step 1 — Start Backend
```bash
cd backend
mvn spring-boot:run
```
Backend starts at: `http://localhost:8083`

### Step 2 — Start Frontend
```bash
cd frontend
npm install
npm start
```
Frontend starts at: `http://localhost:3000`

---

## User Credentials

| Username | Password | Role |
|---|---|---|
| `admin` | `admin123` | `ADMIN` |
| `vaidehi` | `user123` | `USER` |

---

## API Endpoints Used

| Method | Endpoint | Role Required | Used In |
|---|---|---|---|
| POST | `/login` | None | Login.js |
| POST | `/logout` | Any (with token) | All dashboards |
| GET | `/user/profile` | USER or ADMIN | UserDashboard.js |
| GET | `/admin/dashboard` | ADMIN only | AdminDashboard.js |

---

## Session Storage

After login, `sessionStorage` holds:

| Key | Value |
|---|---|
| `user` | `vaidehi` or `admin` |
| `role` | `USER` or `ADMIN` |
| `token` | JWT Bearer token |

On logout: `sessionStorage.clear()` is called.

---

## Screenshots Required

| # | File | Description |
|---|---|---|
| 1 | `1_login_ui.png` | Login page UI |
| 2 | `2_user_profile_success.png` | USER accessing `/user/profile` → 200 OK |
| 3 | `3_user_denied_admin.png` | USER denied `/admin/dashboard` → 403 Forbidden |
| 4 | `4_admin_dashboard_success.png` | ADMIN accessing `/admin/dashboard` → 200 OK |
| 5 | `5_session_storage.png` | Browser devtools showing sessionStorage with role |
| 6 | `6_unauthorized_redirect.png` | Accessing `/admin` without login → redirect to `/` |

---

## Installation Commands

```bash
# Frontend setup
npx create-react-app frontend
cd frontend
npm install axios bootstrap @mui/material @emotion/react @emotion/styled react-router-dom @mui/icons-material

# Backend
cd backend
mvn spring-boot:run
```

---

## Summary

This experiment demonstrates frontend implementation of role-based authorization using **React**, **Bootstrap**, and **Material UI** integrated with the **Spring Boot RBAC backend**. The React app uses `sessionStorage` for session management, `React Router` for protected navigation, and `Axios` for authenticated API calls.
