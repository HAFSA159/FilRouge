package com.matchflex.controller;

import com.matchflex.config.JwtTokenProvider;
import com.matchflex.dto.*;
import com.matchflex.entity.User;
import com.matchflex.repository.UserRepository;
import com.matchflex.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthController(UserService userService, JwtTokenProvider jwtTokenProvider, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.jwtTokenProvider = jwtTokenProvider;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;

    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserDTO registrationDto) {
            UserDTO newUser = userService.registerUser(registrationDto);
            String token = jwtTokenProvider.generateToken(newUser.getEmail());

        return ResponseEntity.ok(new LoginResponseDto(token, "success", null, newUser.getRole()));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginDTO loginDto) {


        if (loginDto.getEmail() == null || loginDto.getEmail().isEmpty()) {
            throw new IllegalArgumentException("Body cannot be empty");
        }

        if (loginDto.getPassword() == null || loginDto.getPassword().isEmpty()) {
            throw new IllegalArgumentException("Body cannot be empty");
        }

        LoginResponseDto responseDto = userService.Login(loginDto);


        return ResponseEntity.ok(new LoginResponseDto(responseDto.getToken(), responseDto.getMessage(), null, responseDto.getRole()));
    }


//    @PostMapping("/login")
//    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
//        try {
//            // Vérifiez si l'email existe
//            User user = userRepository.findByEmail(loginRequest.getEmail())
//                    .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));
//
//            // Vérifiez si le mot de passe correspond
//            if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
//                throw new IllegalArgumentException("Invalid email or password");
//            }
//
//            // Générez un token JWT
//            String token = jwtTokenProvider.generateToken(user.getEmail());
//
//            // Convertir l'utilisateur en DTO
//            UserDTO userDTO = userService.getUserByEmail(user.getEmail());
//
//            return ResponseEntity.ok(Map.of(
//                    "token", token,
//                    "user", userDTO
//            ));
//        } catch (IllegalArgumentException e) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                    .body(Map.of("message", e.getMessage()));
//        }
//    }
}