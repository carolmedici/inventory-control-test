package com.company.inventory.backend.domain.persistence.repository;

import com.company.inventory.backend.domain.persistence.entity.RawMaterial;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RawMaterialRepository  extends JpaRepository<RawMaterial, Long> {
}
