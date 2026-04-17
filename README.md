# 🚀 Frontend Integration with RBAC

### ⚛️ React + 🔐 Spring Boot + JWT

---

## 👩‍💻 Student Details

**Name:** Vaidehi Sharma
**Course:** FullStack Development 2026

---

## 📌 Project Overview

This project demonstrates a React frontend integrated with a Spring Boot RBAC backend using JWT authentication.

It implements Role-Based Access Control (RBAC) with two roles:

* 🔐 ADMIN → Full access (Admin + User endpoints)
* 👤 USER → Restricted access (User endpoints only)

---

## 🛠️ Tech Stack

* Frontend: React 18, React Router v6
* UI: Material UI (MUI) v5 + Bootstrap 5
* HTTP Client: Axios
* Auth Storage: sessionStorage
* Backend: Spring Boot 3.2 + Spring Security + JWT

---

## 📂 Project Structure

Vaidehi_Exp9/
├── backend/
├── frontend/
│   └── src/
│       ├── components/
│       ├── App.js
│       └── index.js
├── screenshots/
└── README.md

---

## ✨ Features

### 🔑 Login Page

* POST /login
* Stores token, role, user in sessionStorage
* Redirects based on role

### 👤 User Dashboard

* GET /user/profile
* Accessible by USER and ADMIN
* Shows 403 for admin access

### 🛡️ Admin Dashboard

* GET /admin/dashboard
* ADMIN only access

### 🚪 Logout

* POST /logout
* sessionStorage cleared

---

## 🔐 API Endpoints

| Method | Endpoint         | Access        |
| ------ | ---------------- | ------------- |
| POST   | /login           | Public        |
| POST   | /logout          | Authenticated |
| GET    | /user/profile    | USER / ADMIN  |
| GET    | /admin/dashboard | ADMIN         |

---

## ▶️ Run Project

Backend:
cd backend
mvn spring-boot:run

Frontend:
cd frontend
npm install
npm start

---

## 🧾 Summary

* JWT Authentication
* RBAC Implementation
* Protected Routes
* Secure API Integration
