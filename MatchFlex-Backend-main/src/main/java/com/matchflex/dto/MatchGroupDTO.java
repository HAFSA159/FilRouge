package com.matchflex.dto;

import lombok.Data;
import java.util.List;

@Data
public class MatchGroupDTO {
    private Long groupId;
    private String name;
    private List<String> countries;
    private List<String> flags;
}