package com.matchflex.service;

import com.matchflex.dto.LoginDTO;
import com.matchflex.dto.LoginResponseDto;
import com.matchflex.dto.UserDTO;
import com.matchflex.dto.UserRegistrationDto;

import java.util.List;

public interface UserService {
    UserDTO createUser(UserDTO userDTO);
    UserDTO getUserById(Long id);
    UserDTO getUserByEmail(String email);
    List<UserDTO> getAllUsers();
    String getUserRoleById(Long id);
    UserDTO updateUser(Long id, UserDTO userDTO);
    void deleteUser(Long id);
    List<UserDTO> searchUsersByName(String name);
    boolean isEmailTaken(String email);
    boolean isPhoneNumberTaken(String phoneNumber);
    UserDTO registerUser(UserDTO registrationDto);
    LoginResponseDto Login(LoginDTO loginDto);
}

