package com.matchflex.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.matchflex.dto.BandScanDTO;
import com.matchflex.entity.BandScan;
import com.matchflex.entity.SmartBand;
import com.matchflex.repository.BandScanRepository;
import com.matchflex.repository.SmartBandRepository;
import com.matchflex.service.CardService;
import jakarta.transaction.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;


@Service
@Transactional
public class CardServiceImpl implements CardService {

    private static final Logger logger = LoggerFactory.getLogger(CardService.class);
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final SmartBandRepository smartBandRepository;
    private final BandScanRepository bandScanRepository;
    private String selectedDate = "dimanche 21 décembre 2025"; // Valeur par défaut

    public CardServiceImpl(SmartBandRepository smartBandRepository, BandScanRepository bandScanRepository) {
        this.smartBandRepository = smartBandRepository;
        this.bandScanRepository = bandScanRepository;
    }

    public void setSelectedDate(String date) {
        this.selectedDate = date;
    }

    @Override
    public void processCardData(String jsonPayload) {
        try {
            CardRequest cardRequest = objectMapper.readValue(jsonPayload, CardRequest.class);
            String cardId = cardRequest.getCardId();
            logger.info("Carte détectée avec ID: {}", cardId);

            // Rechercher le bracelet et son propriétaire
            SmartBand smartBand = smartBandRepository.findBySerialNumber(cardId)
                    .orElse(null);

            if (smartBand != null && smartBand.getOwner() != null) {
                // Trouver les matchs pour la date sélectionnée
                List<Long> matchIds = getMatchIdsForDate(selectedDate);
                logger.info("Traitant les matchs pour la date: {}, IDs: {}", selectedDate, matchIds);

                if (!matchIds.isEmpty()) {
                    // Créer un scan pour chaque match de la date sélectionnée
                    for (Long matchId : matchIds) {
                        // Vérifier si l'utilisateur a déjà scanné pour ce match
                        if (!bandScanRepository.existsByUserAndMatchId(smartBand.getOwner(), matchId)) {
                            BandScan scan = new BandScan();
                            scan.setSerialNumber(cardId);
                            scan.setScanTime(LocalDateTime.now());
                            scan.setUser(smartBand.getOwner());
                            scan.setMatchId(matchId);

                            bandScanRepository.save(scan);
                            logger.info("Scan enregistré pour l'utilisateur: {} et match: {}",
                                    smartBand.getOwner().getUsername(), matchId);
                        }
                    }
                } else {
                    logger.warn("Aucun match trouvé pour la date: {}", selectedDate);
                }
            } else {
                logger.warn("Bracelet non trouvé: {}", cardId);
            }
        } catch (Exception e) {
            logger.error("Erreur lors du traitement", e);
        }
    }

    private List<Long> getMatchIdsForDate(String date) {
        Map<String, List<Long>> dateToMatchIds = new HashMap<>();
        dateToMatchIds.put("dimanche 21 décembre 2025", Arrays.asList(1L));
        dateToMatchIds.put("lundi 22 décembre 2025", Arrays.asList(2L));
        dateToMatchIds.put("vendredi 26 décembre 2025", Arrays.asList(3L, 4L));
        dateToMatchIds.put("lundi 29 décembre 2025", Arrays.asList(5L, 6L));

        return dateToMatchIds.getOrDefault(date, Collections.emptyList());
    }

    public boolean isAuthorizedCard(String cardId) {
        return "D30DA8AA".equals(cardId) || "F3FAC31B".equals(cardId);
    }

    private BandScanDTO convertToDTO(BandScan scan) {
        BandScanDTO dto = new BandScanDTO();
        dto.setId(scan.getId());
        dto.setSerialNumber(scan.getSerialNumber());
        dto.setScanTime(scan.getScanTime());
        dto.setMatchId(scan.getMatchId());
        dto.setUserId(scan.getUser().getUserId());
        dto.setUserName(scan.getUser().getFirstName() + " " + scan.getUser().getLastName());

        return dto;
    }


}

