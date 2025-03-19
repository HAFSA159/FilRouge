package com.matchflex.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class UserRegistrationDto {
    private String username;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String role;

    // Constructeurs (optionnels)
    public UserRegistrationDto() {
    }

    public UserRegistrationDto(String username, String email, String password,
                               String firstName, String lastName, String phoneNumber) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
    }
}