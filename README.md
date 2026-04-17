🚀 Experiment 9 — Frontend Integration with RBAC


📌 Project Overview

This project demonstrates a React frontend integrated with a Spring Boot RBAC backend using JWT authentication.

It implements Role-Based Access Control (RBAC) with two user roles:

🔐 ADMIN → Full access (Admin + User endpoints)
👤 USER → Restricted access (User endpoints only)

The application ensures secure routing, UI control, and API protection based on roles.

🛠️ Tech Stack
Layer	Technology
Frontend	React 18, React Router v6
UI Framework	Material UI (MUI) v5 + Bootstrap 5
HTTP Client	Axios
Auth Storage	sessionStorage
Backend	Spring Boot 3.2 + Spring Security + JWT
📂 Project Structure
Vaidehi_Exp9/
├── backend/
│   └── Spring Boot RBAC Backend
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js
│   │   │   ├── UserDashboard.js
│   │   │   └── AdminDashboard.js
│   │   ├── App.js
│   │   └── index.js
│
├── screenshots/
├── README.md
└── .gitignore
✨ Features Implemented
🔑 1. Login Page
Username & password input
Show/Hide password toggle 👁️
API: POST /login
Stores:
Token
Role
Username (in sessionStorage)
Redirects:
ADMIN → /admin
USER → /user
❌ Error handling for invalid login
👤 2. User Dashboard
Accessible by: USER + ADMIN
API Call: GET /user/profile
Displays:
API response
Session data
🚫 Demonstrates 403 Forbidden on admin access
🛡️ 3. Admin Dashboard
Accessible by: ADMIN only
APIs:
GET /admin/dashboard
GET /user/profile
👑 Full control panel
Shows both:
User features
Admin features
🎯 4. Role-Based UI Control
USER:
Can see user controls
Admin button visible but restricted (403)
ADMIN:
Sees all controls
🔍 Demonstrates frontend + backend enforcement
🚪 5. Logout
API: POST /logout

Clears session:

sessionStorage.clear();
Redirects to login page
🔒 6. Route Protection

Implemented using ProtectedRoute:

❌ No token → Redirect to /
⚠️ Wrong role → Redirect to correct dashboard
🔐 API Endpoints
Method	Endpoint	Role Required	Used In
POST	/login	None	Login
POST	/logout	Any (with token)	All dashboards
GET	/user/profile	USER / ADMIN	User Dashboard
GET	/admin/dashboard	ADMIN	Admin Dashboard
💾 Session Storage

After login:

Key	Value
user	admin / vaidehi
role	USER / ADMIN
token	JWT Token

On logout:

sessionStorage.clear();
🧪 Test Credentials
Username	Password	Role
admin	admin123	ADMIN
vaidehi	user123	USER
▶️ How to Run
🔹 Step 1 — Start Backend
cd backend
mvn spring-boot:run

📍 Runs at: http://localhost:8083

🔹 Step 2 — Start Frontend
cd frontend
npm install
npm start

📍 Runs at: http://localhost:3000

📸 Screenshots Required
#	File Name	Description
1	1_login_ui.png	Login page
2	2_user_profile_success.png	USER → /user/profile (200 OK)
3	3_user_denied_admin.png	USER → /admin (403)
4	4_admin_dashboard_success.png	ADMIN → /admin (200 OK)
5	5_session_storage.png	sessionStorage view
6	6_unauthorized_redirect.png	Redirect without login
⚙️ Installation Commands
Frontend Setup
npx create-react-app frontend
cd frontend
npm install axios bootstrap @mui/material @emotion/react @emotion/styled react-router-dom @mui/icons-material
Backend
cd backend
mvn spring-boot:run
🧾 Summary

This experiment successfully demonstrates:

🔐 Secure authentication using JWT
🧠 Role-Based Access Control (RBAC)
⚛️ React frontend with protected routes
📦 session-based state management
🔗 Seamless integration with Spring Boot backend

The project highlights real-world authorization patterns used in modern full-stack applications.
