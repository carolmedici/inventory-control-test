package com.company.inventory.backend.web.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductCompositionRequest {

    private Long productId;
    private Long rawMaterialId;
    private Integer requiredQuantity;
}
