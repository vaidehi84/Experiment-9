import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const login = async () => {
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:8083/login", {
        username,
        password,
      });

      if (res.status === 200) {
        const { token, role } = res.data;

        sessionStorage.setItem("user", username);
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("role", role);

        if (role === "ADMIN") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/user";
        }
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Invalid username or password.");
      } else {
        setError("Server error. Make sure the backend is running on port 8083.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") login();
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ background: "linear-gradient(135deg, #1a237e 0%, #0d47a1 50%, #01579b 100%)" }}
    >
      <Card sx={{ width: 420, borderRadius: 3, boxShadow: 10 }}>
        <CardContent sx={{ p: 4 }}>
          {/* Header */}
          <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
            <Box
              sx={{
                backgroundColor: "#1565c0",
                borderRadius: "50%",
                p: 1.5,
                mb: 1.5,
              }}
            >
              <LockOutlinedIcon sx={{ color: "white", fontSize: 32 }} />
            </Box>
            <Typography variant="h5" fontWeight="bold" color="primary">
              RBAC Login
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={0.5}>
              Experiment 9 — Role-Based Access Control
            </Typography>
          </Box>

          {/* Error */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* Fields */}
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            sx={{ mb: 3 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            onClick={login}
            disabled={loading}
            sx={{ py: 1.5, borderRadius: 2, fontWeight: "bold" }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>

          {/* Hints */}
          <Box mt={3} p={2} sx={{ background: "#f5f5f5", borderRadius: 2 }}>
            <Typography variant="caption" display="block" color="text.secondary" fontWeight="bold" mb={0.5}>
              Test Credentials:
            </Typography>
            <Typography variant="caption" display="block" color="text.secondary">
              👤 USER: <strong>vaidehi</strong> / user123
            </Typography>
            <Typography variant="caption" display="block" color="text.secondary">
              🔑 ADMIN: <strong>admin</strong> / admin123
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Login;
