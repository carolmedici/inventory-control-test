package com.company.inventory.backend.domain.persistence.repository;

import com.company.inventory.backend.domain.persistence.entity.ProductComposition;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductCompositionRepository extends JpaRepository<ProductComposition, Long> {

    List<ProductComposition> findByProductId(Long productId);

    Optional<ProductComposition>
    findByProductIdAndRawMaterialId(Long productId, Long rawMaterialId);

}
