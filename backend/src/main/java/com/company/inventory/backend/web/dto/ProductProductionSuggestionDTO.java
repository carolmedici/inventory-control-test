package com.company.inventory.backend.web.dto;

import java.math.BigDecimal;

public record ProductProductionSuggestionDTO (
        Long productId,
        String productName,
        BigDecimal productPrice,
        int maxQuantity,
        BigDecimal totalValue
){}
