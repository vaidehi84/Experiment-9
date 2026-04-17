import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";

function ProtectedRoute({ children, requiredRole }) {
  const role = sessionStorage.getItem("role");
  const token = sessionStorage.getItem("token");

  if (!token || !role) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to={role === "ADMIN" ? "/admin" : "/user"} replace />;
  }

  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
