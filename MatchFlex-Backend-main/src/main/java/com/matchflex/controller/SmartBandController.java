package com.matchflex.controller;

import com.matchflex.config.JwtTokenProvider;
import com.matchflex.dto.BandScanDTO;
import com.matchflex.dto.SmartBandDTO;
import com.matchflex.entity.BandScan;
import com.matchflex.entity.Enum.BandStatus;
import com.matchflex.entity.SmartBand;
import com.matchflex.entity.User;
import com.matchflex.repository.BandScanRepository;
import com.matchflex.repository.MatchRepository;
import com.matchflex.repository.UserRepository;
import com.matchflex.service.SmartBandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/smartbands")
public class SmartBandController {

    private final SmartBandService smartBandService;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;
    private final BandScanRepository bandScanRepository;
    private final MatchRepository matchRepository;
     @Autowired
    public SmartBandController(SmartBandService smartBandService, JwtTokenProvider jwtTokenProvider, UserRepository userRepository, BandScanRepository bandScanRepository, MatchRepository matchRepository) {
        this.smartBandService = smartBandService;
        this.jwtTokenProvider = jwtTokenProvider;
        this.userRepository = userRepository;
        this.bandScanRepository = bandScanRepository;
         this.matchRepository = matchRepository;
     }

    @PostMapping
    public ResponseEntity<SmartBandDTO> createSmartBand(@RequestBody SmartBandDTO smartBandDTO) {
        SmartBandDTO createdSmartBand = smartBandService.createSmartBand(smartBandDTO);
        return new ResponseEntity<>(createdSmartBand, HttpStatus.CREATED);
    }

    @GetMapping("/user")
    public ResponseEntity<List<BandScanDTO>> getUserScans(@RequestHeader("Authorization") String token) {
        String email = jwtTokenProvider.extractEmail(token.substring(7));
        User user = userRepository.findByEmail(email).orElseThrow();

        List<BandScanDTO> scans = bandScanRepository.findByUserOrderByScanTimeDesc(user)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());

        return ResponseEntity.ok(scans);
    }

    private BandScanDTO convertToDTO(BandScan scan) {
        BandScanDTO dto = new BandScanDTO();
        dto.setId(scan.getId());
        dto.setSerialNumber(scan.getSerialNumber());
        dto.setScanTime(scan.getScanTime());
        dto.setMatchId(scan.getMatchId());

        // Récupérer les informations de l'utilisateur s'il existe
        if (scan.getUser() != null) {
            dto.setUserId(scan.getUser().getUserId());
            dto.setUserName(scan.getUser().getFirstName() + " " + scan.getUser().getLastName());
            dto.setUserEmail(scan.getUser().getEmail());
        }

        return dto;
    }

    @PostMapping("/assign/{groupId}")
    public ResponseEntity<SmartBandDTO> assignSmartBandToUser(
            @RequestHeader("Authorization") String token,
            @PathVariable Long groupId) {
        String bearerToken = token.substring(7);
        String email = jwtTokenProvider.extractEmail(bearerToken);

        SmartBand newBand = smartBandService.assignSmartBandToUser(email, groupId);
        SmartBandDTO dto = convertToDTO(newBand);

        return ResponseEntity.ok(dto);
    }

    private SmartBandDTO convertToDTO(SmartBand smartBand) {
        SmartBandDTO dto = new SmartBandDTO();
        dto.setBandId(smartBand.getBandId());
        dto.setSerialNumber(smartBand.getSerialNumber());
        dto.setActivationTime(smartBand.getActivationTime());
        dto.setStatus(smartBand.getStatus());

        if (smartBand.getOwner() != null) {
            dto.setUserId(smartBand.getOwner().getUserId());
            dto.setUserName(smartBand.getOwner().getFirstName());
            dto.setUserEmail(smartBand.getOwner().getEmail());
        }

        return dto;
    }

    @GetMapping("/{id}")
    public ResponseEntity<SmartBandDTO> getSmartBandById(@PathVariable Long id) {
        SmartBandDTO smartBand = smartBandService.getSmartBandById(id);
        return ResponseEntity.ok(smartBand);
    }

    @GetMapping
    public ResponseEntity<List<SmartBandDTO>> getAllSmartBands() {
        List<SmartBandDTO> smartBands = smartBandService.getAllSmartBands();
        return ResponseEntity.ok(smartBands);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<SmartBandDTO>> getSmartBandsByStatus(@PathVariable BandStatus status) {
        List<SmartBandDTO> smartBands = smartBandService.getSmartBandsByStatus(status);
        return ResponseEntity.ok(smartBands);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SmartBandDTO> updateSmartBand(@PathVariable Long id, @RequestBody SmartBandDTO smartBandDTO) {
        SmartBandDTO updatedSmartBand = smartBandService.updateSmartBand(id, smartBandDTO);
        return ResponseEntity.ok(updatedSmartBand);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSmartBand(@PathVariable Long id) {
        smartBandService.deleteSmartBand(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/check-serial")
    public ResponseEntity<Boolean> isSerialNumberTaken(@RequestParam String serialNumber) {
        boolean isTaken = smartBandService.isSerialNumberTaken(serialNumber);
        return ResponseEntity.ok(isTaken);
    }

    @PostMapping("/{bandId}/assign/{userId}")
    public ResponseEntity<SmartBandDTO> assignToUser(@PathVariable Long bandId, @PathVariable Long userId) {
        SmartBandDTO assignedSmartBand = smartBandService.assignToUser(bandId, userId);
        return ResponseEntity.ok(assignedSmartBand);
    }
}

