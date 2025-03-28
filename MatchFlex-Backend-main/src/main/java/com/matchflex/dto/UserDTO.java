package com.matchflex.dto;

import com.matchflex.entity.Enum.Role;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private Long userId;
    private String username;
    private String email;
    private String password;
    private String firstName;
    private String lastName;

    private String phoneNumber;
    private Long smartBandId;
    @Enumerated(EnumType.STRING)
    private Role role;


    public String getPhoneNumber() {
        return (phoneNumber != null && !phoneNumber.isEmpty()) ? phoneNumber : "+1234567890";
    }
}
