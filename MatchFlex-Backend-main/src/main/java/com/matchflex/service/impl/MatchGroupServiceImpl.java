package com.matchflex.service.impl;

import com.matchflex.dto.MatchGroupDTO;
import com.matchflex.entity.MatchGroup;
import com.matchflex.entity.User;
import com.matchflex.repository.MatchGroupRepository;
import com.matchflex.repository.UserRepository;
import com.matchflex.service.MatchGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class MatchGroupServiceImpl implements MatchGroupService {

    private final MatchGroupRepository matchGroupRepository;
    private final UserRepository userRepository;

    @Autowired
    public MatchGroupServiceImpl(MatchGroupRepository matchGroupRepository, UserRepository userRepository) {
        this.matchGroupRepository = matchGroupRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<MatchGroupDTO> getAllGroups() {
        return matchGroupRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<MatchGroupDTO> getGroupsByUserEmail(String email) {
        return matchGroupRepository.findByUserEmail(email)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public MatchGroupDTO getGroupById(Long id) {
        MatchGroup group = matchGroupRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Group not found"));
        return convertToDTO(group);
    }

    @Override
    public void addUserToGroup(Long groupId, Long userId) {
        MatchGroup group = matchGroupRepository.findById(groupId)
                .orElseThrow(() -> new IllegalArgumentException("Group not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        group.getAuthorizedUsers().add(user);
        matchGroupRepository.save(group);
    }

    @Override
    public void removeUserFromGroup(Long groupId, Long userId) {
        MatchGroup group = matchGroupRepository.findById(groupId)
                .orElseThrow(() -> new IllegalArgumentException("Group not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        group.getAuthorizedUsers().remove(user);
        matchGroupRepository.save(group);
    }

    private MatchGroupDTO convertToDTO(MatchGroup group) {
        MatchGroupDTO dto = new MatchGroupDTO();
        dto.setGroupId(group.getGroupId());
        dto.setName(group.getName());
        dto.setCountries(group.getCountries());
        dto.setFlags(group.getFlags());
        return dto;
    }
}