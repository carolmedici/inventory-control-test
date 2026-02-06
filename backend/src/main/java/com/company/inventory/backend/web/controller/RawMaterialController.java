package com.company.inventory.backend.web.controller;

import com.company.inventory.backend.domain.persistence.entity.Product;
import com.company.inventory.backend.domain.persistence.entity.RawMaterial;
import com.company.inventory.backend.domain.persistence.repository.ProductRepository;
import com.company.inventory.backend.domain.persistence.repository.RawMaterialRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/raw-materials")
@CrossOrigin
public class RawMaterialController {
    private final RawMaterialRepository repository;

    public RawMaterialController(RawMaterialRepository repository){
        this.repository = repository;
    }

    @GetMapping
    public List<RawMaterial> findAll(){
        return repository.findAll();
    }

    @PostMapping
    public  RawMaterial create(@RequestBody RawMaterial rawMaterial){
        return repository.save(rawMaterial);
    }
}
