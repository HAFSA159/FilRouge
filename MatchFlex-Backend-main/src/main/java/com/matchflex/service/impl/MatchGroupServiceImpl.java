package com.matchflex.service.impl;

import com.matchflex.dto.BandScanDTO;
import com.matchflex.dto.MatchGroupDTO;
import com.matchflex.entity.MatchGroup;
import com.matchflex.entity.User;
import com.matchflex.repository.BandScanRepository;
import com.matchflex.repository.MatchGroupRepository;
import com.matchflex.repository.UserRepository;
import com.matchflex.service.MatchGroupService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class MatchGroupServiceImpl implements MatchGroupService {

    private final MatchGroupRepository matchGroupRepository;
    private final UserRepository userRepository;
    private final BandScanRepository bandScanRepository;




    @Override
    public List<MatchGroupDTO> getAllGroups(String email) {


        List<MatchGroup> userGroups  = matchGroupRepository.findByUserEmail(email);

        return matchGroupRepository.findAll()
                .stream()
                .filter(group -> !userGroups.contains(group)) // Exclude user's groups
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
    public MatchGroupDTO createGroupe(MatchGroupDTO matchGroupDTO) {
        if (matchGroupDTO.getName() == null || matchGroupDTO.getName().isEmpty()) {
            throw new IllegalArgumentException("Group name is required");
        }

        MatchGroup matchGroup = new MatchGroup();
        matchGroup.setName(matchGroupDTO.getName());
        matchGroup.setCountries(matchGroupDTO.getCountries());
        matchGroup.setFlags(matchGroupDTO.getFlags());

        matchGroup = matchGroupRepository.save(matchGroup);

        return convertToDTO(matchGroup);
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