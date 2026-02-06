package com.company.inventory.backend.domain.persistence.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "PRODUCT_COMPOSITION")
public class ProductComposition {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name="product_id")
    @JsonIgnore
    private Product product;

    @ManyToOne(optional = false)
    @JoinColumn(name="raw_material_id")
    private RawMaterial rawMaterial;

    @Column
    private Integer requiredQuantity;
}
