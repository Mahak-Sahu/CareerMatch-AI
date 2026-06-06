package com.mahak.jobmatching.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mahak.jobmatching.model.AppUser;
import com.mahak.jobmatching.repository.UserRepository;
import com.mahak.jobmatching.security.JwtUtil;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {
@Autowired
private JwtUtil jwtUtil;
    @Autowired
    private UserRepository userRepository;

    // SIGNUP
    @PostMapping("/signup")
    public String signup(@RequestBody AppUser user) {

        AppUser existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser != null) {
            return "Email already exists!";
        }

        userRepository.save(user);

        return "User registered successfully!";
    }

    // LOGIN
    @PostMapping("/login")
    public String login(@RequestBody AppUser user) {

        AppUser existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser == null) {
            return "User not found!";
        }

        if (!existingUser.getPassword().equals(user.getPassword())) {
            return "Invalid password!";
        }

        String token =
        jwtUtil.generateToken(
                existingUser.getEmail());

return token;
    }
}