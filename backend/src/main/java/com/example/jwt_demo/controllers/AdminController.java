package com.example.jwt_demo.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @GetMapping("/dashboard")
    public ResponseEntity<?> adminDashboard(Authentication auth) {
        return ResponseEntity.ok(Map.of(
            "message", "Welcome to the Admin Dashboard!",
            "username", auth.getName(),
            "role", "ADMIN",
            "access", "Full system access granted"
        ));
    }

    @GetMapping("/users")
    public ResponseEntity<?> listUsers(Authentication auth) {
        return ResponseEntity.ok(Map.of(
            "message", "All registered users",
            "users", new String[]{"admin (ADMIN)", "vaidehi (USER)"},
            "requestedBy", auth.getName()
        ));
    }
}
