package com.company.inventory.backend.domain.persistence.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "RAW_MATERIAL")
public class RawMaterial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String code;

    @Column
    private String name;

    @Column
    private Integer stockQuantity;

    @OneToMany(mappedBy = "rawMaterial")
    @JsonIgnore
    private List<ProductComposition> composition;
}
