package com.matchflex.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Data
@Entity
@Table(name = "abonnement_plans")
public class AbonnementPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long planId;

    private String planname;
    private Integer matchLimit;
    private Double basePrice;
    private String description;

    @OneToMany(mappedBy = "abonnementPlan")
    @JsonIgnore
    private List<MatchPackage> availablePackages;
}

