package com.matchflex.dto;

import lombok.Data;

@Data
public class UserDTO {
    private Long userId;
    private String username;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private Long smartBandId;
    private String role;

    // Constructor for UserDTO with default values for sensitive information
    public UserDTO(Long userId, String username, String email, String firstName, String lastName, String phoneNumber, Long smartBandId, String role) {
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.password = null;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.smartBandId = smartBandId;
        this.role = role;
    }

    public String getPhoneNumber() {
        return (phoneNumber != null && !phoneNumber.isEmpty()) ? phoneNumber : "+1234567890";
    }
}
