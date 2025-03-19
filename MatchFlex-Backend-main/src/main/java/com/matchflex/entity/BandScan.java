package com.matchflex.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "band_scan")
public class BandScan {
    @Id
    @GeneratedValue
    private Long id;
    private String serialNumber;
    private LocalDateTime scanTime;
    private Long matchId; // Pour lier le scan à un match spécifique

    @ManyToOne
    private User user;
}
