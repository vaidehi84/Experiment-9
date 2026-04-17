package com.example.jwt_demo.security;

import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@Component
public class TokenBlacklist {

    private final Set<String> invalidatedTokens = Collections.synchronizedSet(new HashSet<>());

    public void invalidate(String token) {
        invalidatedTokens.add(token);
    }

    public boolean isInvalidated(String token) {
        return invalidatedTokens.contains(token);
    }
}
