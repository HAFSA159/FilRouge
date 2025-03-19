package com.matchflex.controller;

import com.matchflex.config.JwtTokenProvider;
import com.matchflex.dto.TestScanRequest;
import com.matchflex.entity.BandScan;
import com.matchflex.entity.User;
import com.matchflex.repository.BandScanRepository;
import com.matchflex.repository.MatchRepository;
import com.matchflex.repository.UserRepository;
import com.matchflex.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/bandscans")
public class BandScanController {

    private final BandScanRepository bandScanRepository;
    private final UserRepository userRepository;
    private final MatchRepository matchRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final CardService cardService;

    @Autowired
    public BandScanController(BandScanRepository bandScanRepository,
                              UserRepository userRepository,
                              MatchRepository matchRepository,
                              JwtTokenProvider jwtTokenProvider, CardService cardService) {
        this.bandScanRepository = bandScanRepository;
        this.userRepository = userRepository;
        this.matchRepository = matchRepository;
        this.jwtTokenProvider = jwtTokenProvider;
        this.cardService = cardService;
    }

    // Dans un contrôleur approprié, par exemple BandScanController.java
    @PostMapping("/selected-date")
    public ResponseEntity<?> updateSelectedDate(@RequestBody Map<String, String> request,
                                                @RequestHeader("Authorization") String token) {
        String date = request.get("selectedDate");
        if (date == null || date.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Date non spécifiée"));
        }

        cardService.setSelectedDate(date);
        return ResponseEntity.ok(Map.of("message", "Date mise à jour avec succès"));
    }

    @PostMapping("/test")
    public ResponseEntity<?> testScan(@RequestBody TestScanRequest request,
                                      @RequestHeader("Authorization") String token) {
        String email = jwtTokenProvider.extractEmail(token.substring(7));
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        // Utilisez directement la fonction getMatchIdsForDate
        List<Long> matchIds = getMatchIdsForDate(request.getTestDate());

        if (matchIds.isEmpty()) {
            return ResponseEntity.ok(Map.of("message", "Aucun match trouvé pour cette date"));
        }

        List<BandScan> newScans = new ArrayList<>();

        for (Long matchId : matchIds) {
            // Vérifier si un scan existe déjà
            List<BandScan> existingScans = bandScanRepository
                    .findByUserAndMatchId(user, matchId);

            if (existingScans.isEmpty()) {
                // Créer un nouveau scan
                BandScan scan = new BandScan();
                scan.setUser(user);
                scan.setMatchId(matchId);
                scan.setScanTime(LocalDateTime.now());

                // Si l'utilisateur a un bracelet, utiliser son numéro de série
                if (user.getSmartBand() != null) {
                    scan.setSerialNumber(user.getSmartBand().getSerialNumber());
                } else {
                    scan.setSerialNumber("SIMULATED");
                }

                newScans.add(bandScanRepository.save(scan));
            }
        }

        return ResponseEntity.ok(Map.of(
                "message", "Scans de test effectués",
                "scansCreated", newScans.size()
        ));
    }

    private List<Long> getMatchIdsForDate(String formattedDate) {
        Map<String, List<Long>> dateToMatchIds = new HashMap<>();
        dateToMatchIds.put("dimanche 21 décembre 2025", Arrays.asList(1L));
        dateToMatchIds.put("lundi 22 décembre 2025", Arrays.asList(2L));
        dateToMatchIds.put("vendredi 26 décembre 2025", Arrays.asList(3L, 4L));
        dateToMatchIds.put("lundi 29 décembre 2025", Arrays.asList(5L, 6L));

        return dateToMatchIds.getOrDefault(formattedDate, Collections.emptyList());
    }
}