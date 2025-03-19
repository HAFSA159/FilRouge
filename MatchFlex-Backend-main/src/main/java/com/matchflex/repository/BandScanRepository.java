package com.matchflex.repository;

import com.matchflex.entity.BandScan;
import com.matchflex.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface BandScanRepository extends JpaRepository<BandScan, Long> {

    // Trouver tous les scans d'un utilisateur spécifique
    List<BandScan> findByUserOrderByScanTimeDesc(User user);

    // Trouver les scans d'un utilisateur pour un match spécifique
    List<BandScan> findByUserAndMatchId(User user, Long matchId);

    // Vérifier si un utilisateur a scanné son bracelet pour un match
    boolean existsByUserAndMatchId(User user, Long matchId);
}