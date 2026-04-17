🚀 Frontend Integration with RBAC
⚛️ React + 🔐 Spring Boot + JWT
👩‍💻 Student Details

Name: Vaidehi Sharma
Course: FullStack Development 2026

📌 Project Overview

This project demonstrates a React frontend integrated with a Spring Boot RBAC backend using JWT authentication.

It implements Role-Based Access Control (RBAC) with two user roles:

🔐 ADMIN → Full access (Admin + User endpoints)
👤 USER → Restricted access (User endpoints only)

The application ensures secure routing, UI control, and API protection based on roles.

🛠️ Tech Stack
Frontend: React 18, React Router v6
UI: Material UI (MUI) v5 + Bootstrap 5
HTTP Client: Axios
Auth Storage: sessionStorage
Backend: Spring Boot 3.2 + Spring Security + JWT
📂 Project Structure
Vaidehi_Exp9/
│
├── backend/
│   └── Spring Boot RBAC Backend
│
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── Login.js
│       │   ├── UserDashboard.js
│       │   └── AdminDashboard.js
│       ├── App.js
│       └── index.js
│
├── screenshots/
├── README.md
└── .gitignore
✨ Features
🔑 Login Page
Username & password input
Show/Hide password toggle
API: POST /login
Stores:
token
role
user (in sessionStorage)
Redirect:
ADMIN → /admin
USER → /user
Shows error on invalid credentials
👤 User Dashboard
Accessible by USER and ADMIN
API: GET /user/profile
Displays API response and session data
Shows 403 Forbidden when accessing admin endpoint
🛡️ Admin Dashboard
Accessible by ADMIN only
APIs:
GET /admin/dashboard
GET /user/profile
Displays both admin and user controls
🎯 Role-Based UI Control
USER:
Only user features accessible
Admin actions return 403
ADMIN:
Full access to all features
🚪 Logout
API: POST /logout
Clears session:
sessionStorage.clear();
Redirects to login page
🔒 Route Protection
No token → Redirect to /
Wrong role → Redirect to correct dashboard
🔐 API Endpoints
Method	Endpoint	Role Required
POST	/login	None
POST	/logout	Authenticated
GET	/user/profile	USER / ADMIN
GET	/admin/dashboard	ADMIN
💾 Session Storage

After login:

user → admin / vaidehi
role → USER / ADMIN
token → JWT token
🧪 Test Credentials
Username	Password	Role
admin	admin123	ADMIN
vaidehi	user123	USER
▶️ How to Run
🔹 Backend
cd backend
mvn spring-boot:run

Runs on: http://localhost:8083

🔹 Frontend
cd frontend
npm install
npm start

Runs on: http://localhost:3000

📸 Screenshots
Login UI
USER → /user/profile (200 OK)
USER → /admin (403 Forbidden)
ADMIN → /admin (200 OK)
Session Storage view
Unauthorized redirect
🧾 Summary
JWT Authentication
Role-Based Access Control (RBAC)
Protected React Routes
session-based authentication
Spring Boot integration
💡 Future Improvements
Refresh tokens
Persistent login
Better UI
Admin role management
