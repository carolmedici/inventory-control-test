package com.company.inventory.backend.domain.persistence.service;

import com.company.inventory.backend.domain.persistence.entity.Product;
import com.company.inventory.backend.domain.persistence.entity.ProductComposition;
import com.company.inventory.backend.domain.persistence.entity.RawMaterial;
import com.company.inventory.backend.domain.persistence.repository.ProductRepository;
import com.company.inventory.backend.web.dto.ProductProductionSuggestionDTO;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProductProductionSuggestionServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductProductionSuggestionService service;

    @Test
    void shouldCalculateProductionSuggestionCorrectly() {
        Product product = createProduct(
                1L,
                "Car",
                BigDecimal.valueOf(10),
                List.of(
                        createComposition(100, 5),
                        createComposition(50, 10)
                )
        );

        when(productRepository.findAll()).thenReturn(List.of(product));

        List<ProductProductionSuggestionDTO> result = service.calculate();

        assertThat(result).hasSize(1);

        ProductProductionSuggestionDTO dto = result.get(0);
        assertThat(dto.productId()).isEqualTo(1L);
        assertThat(dto.productName()).isEqualTo("Car");
        assertThat(dto.productPrice()).isEqualTo(BigDecimal.valueOf(10));
        assertThat(dto.maxQuantity()).isEqualTo(5);
        assertThat(dto.totalValue()).isEqualTo(BigDecimal.valueOf(50));
    }

    @Test
    void shouldFilterProductsWithZeroMaxQuantity() {
        Product product = createProduct(
                2L,
                "Chair",
                BigDecimal.valueOf(20),
                List.of(
                        createComposition(0, 5)
                )
        );

        when(productRepository.findAll()).thenReturn(List.of(product));

        List<ProductProductionSuggestionDTO> result = service.calculate();

        assertThat(result).isEmpty();
    }

    @Test
    void shouldSortByProductPriceDescending() {
        Product cheaper = createProduct(
                1L,
                "Cheap product",
                BigDecimal.valueOf(10),
                List.of(createComposition(100, 1))
        );

        Product expensive = createProduct(
                2L,
                "Expensive product",
                BigDecimal.valueOf(50),
                List.of(createComposition(100, 1))
        );

        when(productRepository.findAll()).thenReturn(List.of(cheaper, expensive));

        List<ProductProductionSuggestionDTO> result = service.calculate();

        assertThat(result).hasSize(2);
        assertThat(result.get(0).productName()).isEqualTo("Expensive product");
        assertThat(result.get(1).productName()).isEqualTo("Cheap product");
    }


    private Product createProduct(
            Long id,
            String name,
            BigDecimal price,
            List<ProductComposition> compositions
    ) {
        Product product = new Product();
        product.setId(id);
        product.setName(name);
        product.setPrice(price);
        product.setCompositions(compositions);
        return product;
    }

    private ProductComposition createComposition(int stockQuantity, int requiredQuantity) {
        RawMaterial rawMaterial = new RawMaterial();
        rawMaterial.setStockQuantity(stockQuantity);

        ProductComposition composition = new ProductComposition();
        composition.setRawMaterial(rawMaterial);
        composition.setRequiredQuantity(requiredQuantity);

        return composition;
    }
}
