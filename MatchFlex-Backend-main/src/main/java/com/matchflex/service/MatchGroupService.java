package com.matchflex.service;

import com.matchflex.dto.MatchGroupDTO;
import java.util.List;

public interface MatchGroupService {
    List<MatchGroupDTO> getAllGroups();
    List<MatchGroupDTO> getGroupsByUserEmail(String email);
    MatchGroupDTO getGroupById(Long id);
    void addUserToGroup(Long groupId, Long userId);
    void removeUserFromGroup(Long groupId, Long userId);
}