package com.matchflex.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Getter
@Setter
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String username;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String role; // "ADMIN" ou "CLIENT"

    @OneToOne(mappedBy = "owner", cascade = CascadeType.ALL)
    private SmartBand smartBand;

    @ManyToMany(mappedBy = "authorizedUsers")
    private Set<MatchGroup> accessibleGroups = new HashSet<>();

}

