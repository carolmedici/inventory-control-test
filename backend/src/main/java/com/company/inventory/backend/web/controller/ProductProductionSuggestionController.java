package com.company.inventory.backend.web.controller;


import com.company.inventory.backend.domain.persistence.service.ProductProductionSuggestionService;
import com.company.inventory.backend.web.dto.ProductProductionSuggestionDTO;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/product-suggestions")
@CrossOrigin
public class ProductProductionSuggestionController {

    private final ProductProductionSuggestionService service;

    public  ProductProductionSuggestionController(ProductProductionSuggestionService service){
        this.service = service;
    }

    @GetMapping
    public List<ProductProductionSuggestionDTO> list(){
        return service.calculate();
    }
}
