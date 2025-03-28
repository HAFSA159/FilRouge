package com.matchflex.service.impl;

import com.matchflex.config.ApplicationConfig;
import com.matchflex.dto.LoginDTO;
import com.matchflex.dto.LoginResponseDto;
import com.matchflex.dto.UserDTO;
import com.matchflex.dto.UserRegistrationDto;
import com.matchflex.entity.Enum.Role;
import com.matchflex.entity.User;
import com.matchflex.repository.UserRepository;
import com.matchflex.security.JwtService;
import com.matchflex.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ApplicationConfig applicationConfig;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;



    @Override
    public UserDTO createUser(UserDTO userDTO) {
        if (isEmailTaken(userDTO.getEmail())) {
            throw new IllegalArgumentException("Email is already in use");
        }
        if (isPhoneNumberTaken(userDTO.getPhoneNumber())) {
            throw new IllegalArgumentException("Phone number is already in use");
        }
        User user = convertToEntity(userDTO);
//        user.setRole(Role.CLIENT);
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
        return user != null ? user.getRole().toString() : null;
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
    public UserDTO registerUser(UserDTO registrationDto) {
        if (isEmailTaken(registrationDto.getEmail())) {
            throw new IllegalArgumentException("Email is already in use");
        }
        if (isPhoneNumberTaken(registrationDto.getPhoneNumber())) {
            throw new IllegalArgumentException("Phone number is already in use");
        }

        registrationDto.setPassword(applicationConfig.passwordEncoder().encode(registrationDto.getPassword()));
        registrationDto.setRole(Role.CLIENT);

        User userMapped = User.fromDTO(registrationDto);


        User savedUser = userRepository.save(userMapped);
        return convertToDTO(savedUser);
    }

    public LoginResponseDto Login(LoginDTO login) {
        Optional<User> user = userRepository.findByEmail(login.getEmail());


        if (user.isEmpty()) {
            throw new IllegalArgumentException("User not found with email: "+ login.getEmail());
        }
        if (!applicationConfig.passwordEncoder().matches(login.getPassword(), user.get().getPassword())) {
            throw new IllegalArgumentException("Passwords do not match");

        }
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(login.getEmail(), login.getPassword())
            );

            User authenticatedUser = (User) authentication.getPrincipal();

            log.info("Authenticated user: {}", authenticatedUser);
            String jwtToken = jwtService.generateToken(authenticatedUser);

            return new LoginResponseDto(jwtToken, "Success", user.get(), user.get().getRole());

        } catch (BadCredentialsException ex) {


            throw new IllegalArgumentException("Invalid email or password");
        }

    }

    private UserDTO convertToDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setUsername(user.getUsername());
        userDTO.setEmail(user.getEmail());
        userDTO.setFirstName(user.getFirstName());
        userDTO.setLastName(user.getLastName());
        userDTO.setRole(user.getRole());
        userDTO.setPhoneNumber(user.getPhoneNumber());
        userDTO.setSmartBandId(user.getSmartBand() != null ? user.getSmartBand().getBandId() : null);

        return userDTO;
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
