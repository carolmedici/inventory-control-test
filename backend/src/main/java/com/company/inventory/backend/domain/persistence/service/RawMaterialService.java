package com.company.inventory.backend.domain.persistence.service;

import com.company.inventory.backend.core.exceptions.NotFoundException;
import com.company.inventory.backend.domain.persistence.entity.RawMaterial;
import com.company.inventory.backend.domain.persistence.repository.RawMaterialRepository;
import com.company.inventory.backend.web.dto.RawMaterialDTO;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RawMaterialService {

    @Autowired
    private RawMaterialRepository repository;

    public RawMaterialService(RawMaterialRepository repository){
            this.repository = repository;
        }

    @Transactional
    public RawMaterial update(Long id, RawMaterialDTO rawMaterial){
       final RawMaterial entity = repository.findById(id).orElseThrow(() -> new NotFoundException(id));

       if(rawMaterial.getCode() !=null){
           entity.setCode(rawMaterial.getCode());
       }

       if (rawMaterial.getName() != null) {
            entity.setName(rawMaterial.getName());
       }

       if(rawMaterial.getStockQuantity() != null){
            entity.setStockQuantity(rawMaterial.getStockQuantity());
       }
       return repository.save(entity);
    }

    public void delete(Long id){
        final RawMaterial rawMaterial = this.repository.findById(id).orElseThrow(() -> new NotFoundException(id));
        this.repository.delete(rawMaterial);
    }

    public RawMaterial create(RawMaterialDTO dto) {
        RawMaterial rawMaterial = new RawMaterial();
        rawMaterial.setName(dto.getName());
        rawMaterial.setCode(dto.getCode());
        rawMaterial.setStockQuantity(dto.getStockQuantity());

        return repository.save(rawMaterial);
    }
}


