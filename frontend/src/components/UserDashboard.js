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
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import LockIcon from "@mui/icons-material/Lock";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function UserDashboard() {
  const role = sessionStorage.getItem("role");
  const user = sessionStorage.getItem("user");
  const token = sessionStorage.getItem("token");

  const [profileData, setProfileData] = useState(null);
  const [adminError, setAdminError] = useState("");
  const [profileError, setProfileError] = useState("");

  if (!role || !token) {
    window.location.href = "/";
    return null;
  }

  const fetchProfile = async () => {
    setProfileError("");
    setAdminError("");
    try {
      const res = await axios.get("http://localhost:8083/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfileData(res.data);
    } catch (err) {
      setProfileError("Failed to fetch profile: " + (err.response?.data || err.message));
    }
  };

  const tryAdminAccess = async () => {
    setAdminError("");
    setProfileData(null);
    try {
      await axios.get("http://localhost:8083/admin/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      if (err.response?.status === 403) {
        setAdminError("🚫 403 Forbidden — You do not have permission to access admin resources.");
      } else {
        setAdminError("Error: " + (err.response?.data || err.message));
      }
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
      <AppBar position="static" sx={{ background: "#2e7d32" }}>
        <Toolbar>
          <PersonIcon sx={{ mr: 1 }} />
          <Typography variant="h6" flexGrow={1}>
            User Dashboard
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

      <Box maxWidth={700} mx="auto" mt={5} px={2}>
        <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" fontWeight="bold" mb={1}>
              Welcome, {user}! 👋
            </Typography>
            <Chip label="Role: USER" color="success" sx={{ mb: 3 }} />

            <Divider sx={{ mb: 3 }} />

            {/* Allowed Action */}
            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
              ✅ Allowed Actions
            </Typography>
            <Button
              variant="contained"
              color="success"
              startIcon={<AccountCircleIcon />}
              onClick={fetchProfile}
              sx={{ mb: 2, mr: 2 }}
            >
              Get My Profile
            </Button>

            {profileData && (
              <Alert severity="success" sx={{ mb: 2 }}>
                <strong>Profile Data:</strong> {JSON.stringify(profileData)}
              </Alert>
            )}
            {profileError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {profileError}
              </Alert>
            )}

            <Divider sx={{ mb: 3 }} />

            {/* Restricted Action */}
            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
              🚫 Restricted Actions (Admin Only)
            </Typography>
            <Button
              variant="outlined"
              color="error"
              startIcon={<LockIcon />}
              onClick={tryAdminAccess}
              sx={{ mb: 2 }}
            >
              Try Admin Dashboard (Should Fail)
            </Button>

            {adminError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {adminError}
              </Alert>
            )}

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

export default UserDashboard;
