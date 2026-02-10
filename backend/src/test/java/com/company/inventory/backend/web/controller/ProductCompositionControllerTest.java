package com.company.inventory.backend.web.controller;

import com.company.inventory.backend.domain.persistence.entity.Product;
import com.company.inventory.backend.domain.persistence.entity.ProductComposition;
import com.company.inventory.backend.domain.persistence.entity.RawMaterial;
import com.company.inventory.backend.domain.persistence.repository.ProductCompositionRepository;
import com.company.inventory.backend.domain.persistence.repository.ProductRepository;
import com.company.inventory.backend.domain.persistence.repository.RawMaterialRepository;
import com.company.inventory.backend.web.dto.ProductCompositionRequest;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import tools.jackson.databind.ObjectMapper;

import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class ProductCompositionControllerTest {

    private ProductRepository productRepository;
    private RawMaterialRepository rawMaterialRepository;
    private ProductCompositionRepository productCompositionRepository;

    private ProductCompositionController controller;
    private MockMvc mockMvc;
    private ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    void setup() {
        productRepository = mock(ProductRepository.class);
        rawMaterialRepository = mock(RawMaterialRepository.class);
        productCompositionRepository = mock(ProductCompositionRepository.class);

        controller = new ProductCompositionController(productRepository, rawMaterialRepository, productCompositionRepository);
        mockMvc = MockMvcBuilders.standaloneSetup(controller).build();
    }

    @Test
    void shouldCreateNewProductComposition() throws Exception {
        Product product = new Product();
        product.setId(1L);

        RawMaterial rawMaterial = new RawMaterial();
        rawMaterial.setId(2L);

        ProductComposition saved = new ProductComposition();
        saved.setId(10L);
        saved.setProduct(product);
        saved.setRawMaterial(rawMaterial);
        saved.setRequiredQuantity(5);

        ProductCompositionRequest request = new ProductCompositionRequest();
        request.setProductId(1L);
        request.setRawMaterialId(2L);
        request.setRequiredQuantity(5);

        when(productRepository.findById(1L)).thenReturn(Optional.of(product));
        when(rawMaterialRepository.findById(2L)).thenReturn(Optional.of(rawMaterial));
        when(productCompositionRepository.findByProductIdAndRawMaterialId(1L, 2L)).thenReturn(Optional.empty());
        when(productCompositionRepository.save(any(ProductComposition.class))).thenReturn(saved);

        mockMvc.perform(post("/api/product-composition")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.requiredQuantity").value(5));

        verify(productCompositionRepository).save(any(ProductComposition.class));
    }

    @Test
    void shouldListCompositionsByProduct() throws Exception {
        ProductComposition pc = new ProductComposition();
        pc.setId(1L);
        pc.setRequiredQuantity(10);

        when(productCompositionRepository.findByProductId(1L)).thenReturn(List.of(pc));

        mockMvc.perform(get("/api/product-composition/product/{id}", 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].requiredQuantity").value(10));
    }

    @Test
    void shouldDeleteComposition() throws Exception {
        mockMvc.perform(delete("/api/product-composition/{id}", 1L))
                .andExpect(status().isOk());

        verify(productCompositionRepository).deleteById(1L);
    }
}
