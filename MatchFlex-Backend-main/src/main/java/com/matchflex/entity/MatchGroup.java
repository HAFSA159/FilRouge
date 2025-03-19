package com.matchflex.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Entity
@Table(name = "match_groups")
public class MatchGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long groupId;

    private String name;

    @ElementCollection
    private List<String> countries;

    @ElementCollection
    private List<String> flags;

    @OneToMany(mappedBy = "group")
    private List<Match> matches;

    @ManyToMany
    @JoinTable(
            name = "user_match_groups",
            joinColumns = @JoinColumn(name = "group_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> authorizedUsers = new HashSet<>();
}