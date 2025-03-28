package com.matchflex.repository;

import com.matchflex.entity.MatchGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Repository
public interface MatchGroupRepository extends JpaRepository<MatchGroup, Long> {
    @Query("SELECT mg FROM MatchGroup mg JOIN mg.authorizedUsers u WHERE u.email = :email")
    List<MatchGroup> findByUserEmail(@Param("email") String email);
}