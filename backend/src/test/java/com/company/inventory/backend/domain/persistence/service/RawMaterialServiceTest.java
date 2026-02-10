package com.company.inventory.backend.domain.persistence.service;

import com.company.inventory.backend.domain.persistence.entity.Product;
import com.company.inventory.backend.domain.persistence.entity.RawMaterial;
import com.company.inventory.backend.domain.persistence.repository.ProductRepository;
import com.company.inventory.backend.domain.persistence.repository.RawMaterialRepository;
import com.company.inventory.backend.web.dto.ProductDTO;
import com.company.inventory.backend.web.dto.RawMaterialDTO;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;


    @ExtendWith(MockitoExtension.class)
    public class RawMaterialServiceTest {

        @Mock
        private RawMaterialRepository repository;

        @InjectMocks
        private RawMaterialService service;

        @Test
        void shouldUpdateOnlyNonNullFields() {
            RawMaterial existing = new RawMaterial();
            existing.setId(1L);
            existing.setName("Iron");
            existing.setCode("123");
            existing.setStockQuantity(50);

            RawMaterialDTO dto = new RawMaterialDTO();
            dto.setName("Wood");

            when(repository.findById(1L)).thenReturn(Optional.of(existing));
            when(repository.save(any(RawMaterial.class))).thenAnswer(invocation -> invocation.getArgument(0));

            RawMaterial result = service.update(1L, dto);

            assertThat(result.getName()).isEqualTo("Wood");
            assertThat(result.getCode()).isEqualTo("123");
            assertThat(result.getStockQuantity()).isEqualTo(50);

            verify(repository).findById(1L);
            verify(repository).save(existing);
        }


        @Test
        void shouldDeleteRawMaterial() {
            RawMaterial existing = new RawMaterial();
            existing.setId(1L);

            when(repository.findById(1L)).thenReturn(Optional.of(existing));

            service.delete(1L);

            verify(repository).findById(1L);
            verify(repository).delete(existing);
        }

        @Test
        void shouldCreateRawMaterial() {
            RawMaterialDTO dto = new RawMaterialDTO();
            dto.setName("Steel");
            dto.setCode("ST01");
            dto.setStockQuantity(100);

            RawMaterial saved = new RawMaterial();
            saved.setId(1L);
            saved.setName("Steel");
            saved.setCode("ST01");
            saved.setStockQuantity(100);

            when(repository.save(any(RawMaterial.class))).thenReturn(saved);

            RawMaterial result = service.create(dto);

            assertThat(result).isNotNull();
            assertThat(result.getName()).isEqualTo("Steel");
            assertThat(result.getCode()).isEqualTo("ST01");
            assertThat(result.getStockQuantity()).isEqualTo(100);

            verify(repository).save(any(RawMaterial.class));
        }
    }

