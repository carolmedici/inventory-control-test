package com.company.inventory.backend.domain.persistence.repository;

import com.company.inventory.backend.domain.persistence.entity.ProductComposition;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductCompositionRepository extends JpaRepository<ProductComposition, Long> {

}
