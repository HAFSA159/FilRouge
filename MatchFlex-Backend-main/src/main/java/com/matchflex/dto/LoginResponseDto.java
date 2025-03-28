package com.matchflex.dto;


import com.matchflex.entity.Enum.Role;
import com.matchflex.entity.User;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
public class LoginResponseDto {



    private String token;
    private String message;
    private User user;
    @Enumerated(EnumType.STRING)
    private Role role;
}
