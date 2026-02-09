package com.company.inventory.backend.web.controller;

import com.company.inventory.backend.core.exceptions.NotFoundException;
import com.company.inventory.backend.domain.persistence.entity.RawMaterial;
import com.company.inventory.backend.domain.persistence.repository.RawMaterialRepository;
import com.company.inventory.backend.domain.persistence.service.RawMaterialService;
import com.company.inventory.backend.web.dto.RawMaterialDTO;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/raw-materials")
@CrossOrigin
public class RawMaterialController {
    private final RawMaterialRepository repository;
    private final RawMaterialService service;

    public RawMaterialController(
            RawMaterialRepository repository,
            RawMaterialService service
    ){
        this.repository = repository;
        this.service = service;
    }

    @GetMapping
    public List<RawMaterial> findAll(){
        return repository.findAll();
    }

    @PostMapping
    public  RawMaterial create(@RequestBody RawMaterialDTO rawMaterial){
        return this.service.create(rawMaterial);
    }

    @PutMapping("/{id}")
    public RawMaterial update(@PathVariable("id") Long id, @RequestBody @Validated RawMaterialDTO body){
        return this.service.update(id, body);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long id){
        this.service.delete(id);
    }

    @GetMapping("/{id}")
    public RawMaterial findById(@PathVariable Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new NotFoundException(id));
    }
}
