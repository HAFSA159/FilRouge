package com.matchflex.controller;

import com.matchflex.config.JwtTokenProvider;
import com.matchflex.dto.MatchGroupDTO;
import com.matchflex.security.JwtService;
import com.matchflex.service.MatchGroupService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/match-groups")
@AllArgsConstructor
public class MatchGroupController {

    private static final Logger log = LoggerFactory.getLogger(MatchGroupController.class);
    private final MatchGroupService matchGroupService;
    private final JwtTokenProvider jwtTokenProvider;
    private final JwtService jwtService;




//    @GetMapping
//    public ResponseEntity<List<MatchGroupDTO>> getAllGroups() {
//        return ResponseEntity.ok(matchGroupService.getAllGroups());
//    }

    @PostMapping("/create-groupe")
    public ResponseEntity<MatchGroupDTO> createGroupe(@RequestBody MatchGroupDTO matchGroupDTO) {
        return ResponseEntity.ok(matchGroupService.createGroupe(matchGroupDTO));
    }

    @GetMapping("/available")
    public ResponseEntity<List<MatchGroupDTO>> getAvailableGroups(@RequestHeader("Authorization") String token) {
        // Renvoie tous les groupes disponibles à l'achat


        if (token == null || !token.startsWith("Bearer ")) {
            log.info("edmekdmdelkedmlkmedledlkmdekedmlddmkemkled");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String bearerToken = token.substring(7);
        String email = jwtService.extractUsername(bearerToken);
        return ResponseEntity.ok(matchGroupService.getAllGroups(email));
    }

    @GetMapping("/user")
    public ResponseEntity<List<MatchGroupDTO>> getGroupsForCurrentUser(@RequestHeader("Authorization") String token) {
        String bearerToken = token.substring(7);
        String email = jwtService.extractUsername(bearerToken);
        return ResponseEntity.ok(matchGroupService.getGroupsByUserEmail(email));
    }

    @GetMapping("/{id}")
    public ResponseEntity<MatchGroupDTO> getGroupById(@PathVariable Long id) {
        return ResponseEntity.ok(matchGroupService.getGroupById(id));
    }

    @PostMapping("/{groupId}/users/{userId}")
    public ResponseEntity<?> addUserToGroup(@PathVariable Long groupId, @PathVariable Long userId) {
        matchGroupService.addUserToGroup(groupId, userId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{groupId}/users/{userId}")
    public ResponseEntity<?> removeUserFromGroup(@PathVariable Long groupId, @PathVariable Long userId) {
        matchGroupService.removeUserFromGroup(groupId, userId);
        return ResponseEntity.ok().build();
    }
}