package com.matchflex.dto;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class BandScanDTO {
    private Long id;
    private String serialNumber;
    private LocalDateTime scanTime;
    private Long matchId;
    private String matchName;
    private Long userId;
    private String userName;
    private String userEmail;

}