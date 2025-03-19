package com.matchflex.service.impl;

import com.matchflex.dto.UserDTO;
import com.matchflex.dto.UserRegistrationDto;
import com.matchflex.entity.User;
import com.matchflex.repository.UserRepository;
import com.matchflex.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDTO createUser(UserDTO userDTO) {
        if (isEmailTaken(userDTO.getEmail())) {
            throw new IllegalArgumentException("Email is already in use");
        }
        if (isPhoneNumberTaken(userDTO.getPhoneNumber())) {
            throw new IllegalArgumentException("Phone number is already in use");
        }
        User user = convertToEntity(userDTO);
        User savedUser = userRepository.save(user);
        return convertToDTO(savedUser);
    }

    @Override
    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + id));
        return convertToDTO(user);
    }
    public String getUserRoleById(Long id) {
        UserDTO user = getUserById(id);
        return user != null ? user.getRole() : null;
    }


    @Override
    public UserDTO getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + email));
        return convertToDTO(user);
    }

    @Override
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public UserDTO updateUser(Long id, UserDTO userDTO) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + id));

        // Check if email or phone number has changed and if they are valid
        if (!existingUser.getEmail().equals(userDTO.getEmail()) && isEmailTaken(userDTO.getEmail())) {
            throw new IllegalArgumentException("Email is already in use");
        }
        if (!existingUser.getPhoneNumber().equals(userDTO.getPhoneNumber()) && isPhoneNumberTaken(userDTO.getPhoneNumber())) {
            throw new IllegalArgumentException("Phone number is already in use");
        }

        // Update only if new values are different
        existingUser.setUsername(userDTO.getUsername());
        existingUser.setEmail(userDTO.getEmail());
        existingUser.setFirstName(userDTO.getFirstName());
        existingUser.setLastName(userDTO.getLastName());
        existingUser.setPhoneNumber(userDTO.getPhoneNumber());

        User updatedUser = userRepository.save(existingUser);
        return convertToDTO(updatedUser);
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("User not found with id: " + id));
        userRepository.deleteById(id);
    }

    @Override
    public List<UserDTO> searchUsersByName(String name) {
        return userRepository.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(name, name).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public boolean isEmailTaken(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public boolean isPhoneNumberTaken(String phoneNumber) {
        return userRepository.existsByPhoneNumber(phoneNumber);
    }

    @Override
    public UserDTO registerUser(UserRegistrationDto registrationDto) {
        if (isEmailTaken(registrationDto.getEmail())) {
            throw new IllegalArgumentException("Email is already in use");
        }
        if (isPhoneNumberTaken(registrationDto.getPhoneNumber())) {
            throw new IllegalArgumentException("Phone number is already in use");
        }

        User user = new User();
        // Utilisez l'email comme nom d'utilisateur par défaut si non fourni
        user.setUsername(registrationDto.getUsername() != null ?
                registrationDto.getUsername() : registrationDto.getEmail());
        user.setEmail(registrationDto.getEmail());
        user.setPassword(passwordEncoder.encode(registrationDto.getPassword()));
        user.setFirstName(registrationDto.getFirstName());
        user.setLastName(registrationDto.getLastName());
        user.setPhoneNumber(registrationDto.getPhoneNumber());
        user.setRole(registrationDto.getRole() != null ? registrationDto.getRole() : "CLIENT");

        User savedUser = userRepository.save(user);
        return convertToDTO(savedUser);
    }

    private UserDTO convertToDTO(User user) {
        return new UserDTO(
                user.getUserId(),
                user.getUsername(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getPhoneNumber(),
                user.getSmartBand() != null ? user.getSmartBand().getBandId() : null,
                user.getRole()
        );
    }

    private User convertToEntity(UserDTO dto) {
        User user = new User();
        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword());
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setPhoneNumber(dto.getPhoneNumber());
        return user;
    }

}
