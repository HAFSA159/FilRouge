package com.matchflex.controller;

import com.matchflex.config.JwtTokenProvider;
import com.matchflex.dto.MatchGroupDTO;
import com.matchflex.service.MatchGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/match-groups")
public class MatchGroupController {

    private final MatchGroupService matchGroupService;
    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public MatchGroupController(MatchGroupService matchGroupService, JwtTokenProvider jwtTokenProvider) {
        this.matchGroupService = matchGroupService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @GetMapping
    public ResponseEntity<List<MatchGroupDTO>> getAllGroups() {
        return ResponseEntity.ok(matchGroupService.getAllGroups());
    }

    @GetMapping("/available")
    public ResponseEntity<List<MatchGroupDTO>> getAvailableGroups() {
        // Renvoie tous les groupes disponibles à l'achat
        return ResponseEntity.ok(matchGroupService.getAllGroups());
    }

    @GetMapping("/user")
    public ResponseEntity<List<MatchGroupDTO>> getGroupsForCurrentUser(@RequestHeader("Authorization") String token) {
        String bearerToken = token.substring(7);
        String email = jwtTokenProvider.extractEmail(bearerToken);
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