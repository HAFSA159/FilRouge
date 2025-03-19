package com.matchflex.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.matchflex.entity.Enum.MatchStatus;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "matches")
public class Match {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long matchId;

    private String homeTeam;
    private String awayTeam;
    private LocalDateTime matchDate;
    private String venue;
    private String stage;

    @Enumerated(EnumType.STRING)
    private MatchStatus status;

    @ManyToOne
    @JoinColumn(name = "package_id")
    @JsonIgnore
    private MatchPackage matchPackage;

    @ManyToOne
    @JoinColumn(name = "group_id")
    private MatchGroup group;

}



