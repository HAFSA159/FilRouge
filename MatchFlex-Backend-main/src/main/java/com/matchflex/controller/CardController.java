package com.matchflex.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/cards")
public class CardController {

    private static final Logger logger = LoggerFactory.getLogger(CardController.class);

    @PostMapping
    public ResponseEntity<String> receiveCard(@RequestBody String cardRequest) {
        logger.info("Carte reçue avec ID: {}", cardRequest);
        return ResponseEntity.ok("Carte reçue avec succès");
    }

    @GetMapping("/api/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("RFID_SERVER");
    }
}