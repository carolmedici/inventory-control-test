package com.company.inventory.backend.domain.persistence.service;

import com.company.inventory.backend.domain.persistence.entity.Product;
import com.company.inventory.backend.domain.persistence.repository.ProductRepository;
import com.company.inventory.backend.web.dto.ProductProductionSuggestionDTO;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.List;

@Service
public class ProductProductionSuggestionService {

    private final ProductRepository productRepository;

    public ProductProductionSuggestionService(ProductRepository productRepository){
        this.productRepository = productRepository;
    }

    public List<ProductProductionSuggestionDTO> calculate(){
        List<Product> products = productRepository.findAll();


        return products.stream()
                .map(this::calculateForProduct)
                .filter(dto -> dto.maxQuantity() > 0)
                .sorted(
                        Comparator.comparing(ProductProductionSuggestionDTO::productPrice)
                                .reversed()
                )
                .toList();
    }


    private ProductProductionSuggestionDTO calculateForProduct(Product product){
        int maxQuantity = product.getCompositions().stream()
                .mapToInt(c ->
                        c.getRawMaterial().getStockQuantity() / c.getRequiredQuantity())
                .min()
                .orElse(0);

        BigDecimal totalValue = product.getPrice().multiply(BigDecimal.valueOf(maxQuantity));

        return new ProductProductionSuggestionDTO(
                product.getId(),
                product.getName(),
                product.getPrice(),
                maxQuantity,
                totalValue
        );
    }
}
