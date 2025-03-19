package com.matchflex.dto;

import lombok.Data;

@Data
public class TestScanRequest {
    private String testDate;

    // Constructeurs, getters et setters
    public TestScanRequest() {
    }

    public TestScanRequest(String testDate) {
        this.testDate = testDate;
    }

    public String getTestDate() {
        return testDate;
    }

    public void setTestDate(String testDate) {
        this.testDate = testDate;
    }
}