import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Alert,
  Chip,
  Divider,
  AppBar,
  Toolbar,
  Grid,
} from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function AdminDashboard() {
  const role = sessionStorage.getItem("role");
  const user = sessionStorage.getItem("user");
  const token = sessionStorage.getItem("token");

  const [adminData, setAdminData] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState("");

  if (!role || !token) {
    window.location.href = "/";
    return null;
  }
  if (role !== "ADMIN") {
    alert("Access Denied");
    window.location.href = "/";
    return null;
  }

  const fetchAdminDashboard = async () => {
    setError("");
    setAdminData(null);
    try {
      const res = await axios.get("http://localhost:8083/admin/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdminData(res.data);
    } catch (err) {
      setError("Error: " + (err.response?.data || err.message));
    }
  };

  const fetchUserProfile = async () => {
    setError("");
    setProfileData(null);
    try {
      const res = await axios.get("http://localhost:8083/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfileData(res.data);
    } catch (err) {
      setError("Error: " + (err.response?.data || err.message));
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:8083/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (e) {
      // ignore
    }
    sessionStorage.clear();
    window.location.href = "/";
  };

  return (
    <Box minHeight="100vh" sx={{ background: "#f0f2f5" }}>
      {/* Navbar */}
      <AppBar position="static" sx={{ background: "#b71c1c" }}>
        <Toolbar>
          <AdminPanelSettingsIcon sx={{ mr: 1 }} />
          <Typography variant="h6" flexGrow={1}>
            Admin Dashboard
          </Typography>
          <Chip
            label={`${user} — ${role}`}
            sx={{ color: "white", border: "1px solid white", mr: 2 }}
            variant="outlined"
          />
          <Button
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={logout}
            variant="outlined"
            sx={{ borderColor: "white" }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Box maxWidth={800} mx="auto" mt={5} px={2}>
        <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" fontWeight="bold" mb={1}>
              Admin Control Panel 🔑
            </Typography>
            <Chip label="Role: ADMIN" color="error" sx={{ mb: 3 }} />

            <Alert severity="info" sx={{ mb: 3 }}>
              As an ADMIN you have <strong>full access</strong> to all endpoints — admin and user.
            </Alert>

            <Divider sx={{ mb: 3 }} />

            {/* Admin Actions */}
            <Typography variant="subtitle1" fontWeight="bold" mb={2}>
              🔐 Admin-Only Actions
            </Typography>
            <Grid container spacing={2} mb={3}>
              <Grid item>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<DashboardIcon />}
                  onClick={fetchAdminDashboard}
                >
                  Admin Dashboard Data
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<PeopleIcon />}
                  onClick={fetchUserProfile}
                >
                  View User Profile (Admin Access)
                </Button>
              </Grid>
            </Grid>

            {adminData && (
              <Alert severity="success" sx={{ mb: 2 }}>
                <strong>Admin Response:</strong> {JSON.stringify(adminData)}
              </Alert>
            )}
            {profileData && (
              <Alert severity="success" sx={{ mb: 2 }}>
                <strong>User Profile:</strong> {JSON.stringify(profileData)}
              </Alert>
            )}
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Divider sx={{ mb: 3 }} />

            {/* Role-Based UI Demo */}
            <Typography variant="subtitle1" fontWeight="bold" mb={2}>
              👁️ Role-Based UI Control (Admin sees all)
            </Typography>
            <Box sx={{ background: "#fff3e0", p: 2, borderRadius: 2, mb: 2 }}>
              <Button
                variant="outlined"
                color="warning"
                startIcon={<AccountCircleIcon />}
                sx={{ mr: 1 }}
              >
                User Controls
              </Button>
              <Button variant="contained" color="error" startIcon={<AdminPanelSettingsIcon />}>
                Admin Controls (Hidden from USER)
              </Button>
            </Box>

            {/* Session Info */}
            <Divider sx={{ mb: 3 }} />
            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
              🗂️ Session Storage Info
            </Typography>
            <Box sx={{ background: "#f5f5f5", p: 2, borderRadius: 2, fontFamily: "monospace", fontSize: 13 }}>
              <div><strong>user:</strong> {sessionStorage.getItem("user")}</div>
              <div><strong>role:</strong> {sessionStorage.getItem("role")}</div>
              <div style={{ wordBreak: "break-all" }}>
                <strong>token:</strong> {token?.substring(0, 60)}...
              </div>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default AdminDashboard;
