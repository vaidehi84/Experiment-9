package com.example.jwt_demo.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {

    @GetMapping("/profile")
    public ResponseEntity<?> userProfile(Authentication auth) {
        return ResponseEntity.ok(Map.of(
            "message", "Your profile",
            "username", auth.getName(),
            "access", "User-level access granted"
        ));
    }

    @GetMapping("/dashboard")
    public ResponseEntity<?> userDashboard(Authentication auth) {
        return ResponseEntity.ok(Map.of(
            "message", "Welcome to the User Dashboard!",
            "username", auth.getName(),
            "role", "USER"
        ));
    }
}
