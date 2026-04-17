package com.example.jwt_demo.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final TokenBlacklist tokenBlacklist;

    public JwtFilter(JwtUtil jwtUtil, TokenBlacklist tokenBlacklist) {
        this.jwtUtil = jwtUtil;
        this.tokenBlacklist = tokenBlacklist;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getServletPath();

        if ("/login".equals(path) || "/logout".equals(path) || "/".equals(path)) {
            filterChain.doFilter(request, response);
            return;
        }

        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);

            if (tokenBlacklist.isInvalidated(token) || !jwtUtil.validateToken(token)) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("401 Unauthorized: Invalid or expired token");
                return;
            }

            String username = jwtUtil.extractUsername(token);
            String role = jwtUtil.extractRole(token);

            // Map role string from JWT to Spring Security GrantedAuthority
            String springRole = (role != null) ? "ROLE_" + role : "ROLE_USER";

            var auth = new UsernamePasswordAuthenticationToken(
                    username,
                    null,
                    List.of(new SimpleGrantedAuthority(springRole))
            );
            SecurityContextHolder.getContext().setAuthentication(auth);
        } else {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("401 Unauthorized: Missing Authorization header");
            return;
        }

        filterChain.doFilter(request, response);
    }
}
