package com.matchflex.service;

import com.matchflex.dto.AbonnementPlanDTO;

import java.util.List;

public interface CardService {
    public void processCardData(String jsonPayload);
    public boolean isAuthorizedCard(String cardId);
    void setSelectedDate(String date);

}

