package com.matchflex.service.impl;

import com.matchflex.dto.SmartBandDTO;
import com.matchflex.entity.Enum.BandStatus;
import com.matchflex.entity.MatchGroup;
import com.matchflex.entity.SmartBand;
import com.matchflex.entity.User;
import com.matchflex.repository.MatchGroupRepository;
import com.matchflex.repository.SmartBandRepository;
import com.matchflex.repository.UserRepository;
import com.matchflex.service.SmartBandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class SmartBandServiceImpl implements SmartBandService {

    private final SmartBandRepository smartBandRepository;
    private final UserRepository userRepository;
     private final  MatchGroupRepository matchGroupRepository;
    private  int cpt = 0;

    @Autowired
    public SmartBandServiceImpl(SmartBandRepository smartBandRepository, UserRepository userRepository, MatchGroupRepository matchGroupRepository) {
        this.smartBandRepository = smartBandRepository;
        this.userRepository = userRepository;
        this.matchGroupRepository = matchGroupRepository;
    }

    @Override
    public SmartBandDTO createSmartBand(SmartBandDTO smartBandDTO) {
        if (isSerialNumberTaken(smartBandDTO.getSerialNumber())) {
            throw new IllegalArgumentException("Serial number is already in use");
        }
        SmartBand smartBand = convertToEntity(smartBandDTO);
        SmartBand savedSmartBand = smartBandRepository.save(smartBand);
        return convertToDTO(savedSmartBand);
    }

    @Override
    public SmartBandDTO getSmartBandById(Long id) {
        SmartBand smartBand = smartBandRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("SmartBand not found with id: " + id));
        return convertToDTO(smartBand);
    }

    @Override
    public SmartBandDTO getSmartBandBySerialNumber(String serialNumber) {
        SmartBand smartBand = smartBandRepository.findBySerialNumber(serialNumber)
                .orElseThrow(() -> new IllegalArgumentException("SmartBand not found with serial number: " + serialNumber));
        return convertToDTO(smartBand);
    }

    @Override
    public List<SmartBandDTO> getAllSmartBands() {
        return smartBandRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<SmartBandDTO> getSmartBandsByStatus(BandStatus status) {
        return smartBandRepository.findByStatus(status).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public SmartBandDTO updateSmartBand(Long id, SmartBandDTO smartBandDTO) {
        SmartBand existingSmartBand = smartBandRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("SmartBand not found with id: " + id));

        if (!existingSmartBand.getSerialNumber().equals(smartBandDTO.getSerialNumber()) &&
                isSerialNumberTaken(smartBandDTO.getSerialNumber())) {
            throw new IllegalArgumentException("Serial number is already in use");
        }

        existingSmartBand.setSerialNumber(smartBandDTO.getSerialNumber());
        existingSmartBand.setActivationTime(smartBandDTO.getActivationTime());
        existingSmartBand.setStatus(smartBandDTO.getStatus());

        SmartBand updatedSmartBand = smartBandRepository.save(existingSmartBand);
        return convertToDTO(updatedSmartBand);
    }

    @Override
    public void deleteSmartBand(Long id) {
        if (!smartBandRepository.existsById(id)) {
            throw new IllegalArgumentException("SmartBand not found with id: " + id);
        }
        smartBandRepository.deleteById(id);
    }

    @Override
    public boolean isSerialNumberTaken(String serialNumber) {
        return smartBandRepository.existsBySerialNumber(serialNumber);
    }

    @Override
    public SmartBandDTO assignToUser(Long bandId, Long userId) {
        SmartBand smartBand = smartBandRepository.findById(bandId)
                .orElseThrow(() -> new IllegalArgumentException("SmartBand not found with id: " + bandId));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + userId));

        smartBand.setOwner(user);
        user.setSmartBand(smartBand);

        SmartBand updatedSmartBand = smartBandRepository.save(smartBand);
        userRepository.save(user);

        return convertToDTO(updatedSmartBand);
    }

    private SmartBandDTO convertToDTO(SmartBand smartBand) {
        SmartBandDTO dto = new SmartBandDTO();
        dto.setBandId(smartBand.getBandId());
        dto.setSerialNumber(smartBand.getSerialNumber());
        dto.setActivationTime(smartBand.getActivationTime());
        dto.setStatus(smartBand.getStatus());
        if (smartBand.getOwner() != null) {
            dto.setUserId(smartBand.getOwner().getUserId());
            dto.setUserName(smartBand.getOwner().getFirstName());
            dto.setUserEmail(smartBand.getOwner().getEmail());
        }
        return dto;
    }

    private SmartBand convertToEntity(SmartBandDTO dto) {
        SmartBand smartBand = new SmartBand();
        smartBand.setSerialNumber(dto.getSerialNumber());
        smartBand.setActivationTime(dto.getActivationTime());
        smartBand.setStatus(dto.getStatus());
        return smartBand;
    }

    @Override
    @Transactional
    public SmartBand assignSmartBandToUser(String email, Long groupId) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Vérifier si l'utilisateur a déjà un bracelet
        if (user.getSmartBand() != null) {
            // L'utilisateur a déjà un bracelet, nous allons juste l'associer au groupe
            SmartBand existingBand = user.getSmartBand();
            associateUserWithGroup(user, groupId);
            return existingBand;
        }

        // Créer un nouveau bracelet
        SmartBand smartBand = new SmartBand();
        smartBand.setSerialNumber(generateSerialNumber());
        smartBand.setActivationTime(LocalDateTime.now());
        smartBand.setStatus(BandStatus.INACTIVE);
        smartBand.setOwner(user);

        // Sauvegarder le bracelet
        SmartBand savedBand = smartBandRepository.save(smartBand);

        // Associer l'utilisateur au groupe spécifié
        associateUserWithGroup(user, groupId);

        return savedBand;
    }

    // Méthode privée pour associer un utilisateur à un groupe
    private void associateUserWithGroup(User user, Long groupId) {
        MatchGroup group = matchGroupRepository.findById(groupId)
                .orElseThrow(() -> new IllegalArgumentException("Group not found with ID: " + groupId));

        group.getAuthorizedUsers().add(user);
        matchGroupRepository.save(group);

        System.out.println("Utilisateur " + user.getEmail() + " associé au groupe " + group.getName());
    }

    private String generateSerialNumber() {
        if(cpt==0)
        {
            cpt++;
            return "F3FAC31B";
        }
        else
        {
            return "D30DA8AA";
        }
    }
}

