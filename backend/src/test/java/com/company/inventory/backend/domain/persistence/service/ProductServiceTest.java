package com.company.inventory.backend.domain.persistence.service;

import com.company.inventory.backend.domain.persistence.entity.Product;
import com.company.inventory.backend.domain.persistence.repository.ProductRepository;
import com.company.inventory.backend.web.dto.ProductDTO;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ProductServiceTest {

    @Mock
    private ProductRepository repository;

    @InjectMocks
    private ProductService service;

    @Test
    void shouldUpdateOnlyNonNullFields() {
        Product existing = new Product();
        existing.setId(1L);
        existing.setCode("123");
        existing.setName("Mobile");
        existing.setPrice(BigDecimal.valueOf(10));

        ProductDTO dto = new ProductDTO();
        dto.setName("Notebook");
        dto.setPrice(20.0);

        when(repository.findById(1L)).thenReturn(Optional.of(existing));
        when(repository.save(any(Product.class))).thenAnswer(inv -> inv.getArgument(0));

        Product result = service.update(1L, dto);

        assertThat(result.getCode()).isEqualTo("123");
        assertThat(result.getName()).isEqualTo("Notebook");
        assertThat(result.getPrice()).isEqualByComparingTo(BigDecimal.valueOf(20));

        verify(repository).save(existing);
    }

    @Test
    void shouldDeleteExistingProduct() {
        Product product = new Product();
        product.setId(1L);

        when(repository.findById(1L)).thenReturn(Optional.of(product));

        service.delete(1L);

        verify(repository).delete(product);
    }

    @Test
    void shouldCreateProductSuccessfully() {
        ProductDTO dto = new ProductDTO();
        dto.setName("Refrigerator");
        dto.setCode("7887");
        dto.setPrice(55.5);

        when(repository.save(any(Product.class))).thenAnswer(inv -> inv.getArgument(0));

        Product result = service.create(dto);

        assertThat(result.getName()).isEqualTo("Refrigerator");
        assertThat(result.getCode()).isEqualTo("7887");
        assertThat(result.getPrice()).isEqualTo(BigDecimal.valueOf(55.5));

        verify(repository).save(any(Product.class));
    }
}
