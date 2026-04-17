package com.example.jwt_demo.controllers;

import com.example.jwt_demo.security.JwtUtil;
import com.example.jwt_demo.security.TokenBlacklist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class AuthController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private TokenBlacklist tokenBlacklist;

    // Hardcoded users with roles (in production, use a database)
    private static final Map<String, String[]> USERS = Map.of(
        "admin",    new String[]{"admin123", "ADMIN"},
        "vaidehi",  new String[]{"user123",  "USER"}
    );

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> userData) {
        String username = userData.get("username");
        String password = userData.get("password");

        if (username == null || password == null) {
            return ResponseEntity.status(400).body(Map.of("error", "Username and password are required"));
        }

        String[] credentials = USERS.get(username);
        if (credentials == null || !credentials[0].equals(password)) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid username or password"));
        }

        String role = credentials[1];
        String token = jwtUtil.generateToken(username, role);

        return ResponseEntity.ok(Map.of(
            "token", token,
            "username", username,
            "role", role,
            "message", "Login successful"
        ));
    }

    @GetMapping("/protected")
    public ResponseEntity<?> protectedRoute() {
        return ResponseEntity.ok(Map.of(
            "message", "Access granted to protected route!",
            "status", "authenticated"
        ));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.ok(Map.of("message", "Logged out (no token provided)"));
        }
        String token = authHeader.replace("Bearer ", "");
        tokenBlacklist.invalidate(token);
        return ResponseEntity.ok(Map.of("message", "Logged out successfully. Token invalidated."));
    }
}
