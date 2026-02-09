package com.company.inventory.backend.domain.persistence.service;

import com.company.inventory.backend.core.exceptions.NotFoundException;
import com.company.inventory.backend.domain.persistence.entity.Product;
import com.company.inventory.backend.domain.persistence.repository.ProductRepository;
import com.company.inventory.backend.web.dto.ProductDTO;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class ProductService {

    @Autowired
    private ProductRepository repository;

    public ProductService(ProductRepository repository){
        this.repository = repository;
    }

    @Transactional
    public Product update(Long id, ProductDTO product){
        final Product entity = repository.findById(id).orElseThrow(() -> new NotFoundException(id));

        if(product.getCode() !=null){
            entity.setCode(product.getCode());
        }

        if (product.getName() != null) {
            entity.setName(product.getName());
        }

        if(product.getPrice() != null){
            entity.setPrice(BigDecimal.valueOf(product.getPrice()));
        }
        return repository.save(entity);
    }

    public void delete(Long id){
        final Product product = this.repository.findById(id).orElseThrow(() -> new NotFoundException(id));
        this.repository.delete(product);
    }

    public Product create(ProductDTO dto) {
        Product product = new Product();
        product.setName(dto.getName());
        product.setCode(dto.getCode());
        product.setPrice(BigDecimal.valueOf(dto.getPrice()));

        return repository.save(product);
    }


}
