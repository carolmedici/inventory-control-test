package com.company.inventory.backend.domain.persistence.service;

import com.company.inventory.backend.core.exceptions.NotFoundException;
import com.company.inventory.backend.domain.persistence.entity.Product;
import com.company.inventory.backend.domain.persistence.repository.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    @Autowired
    private ProductRepository repository;

    public ProductService(ProductRepository repository){
        this.repository = repository;
    }

    @Transactional
    public Product upadate(Long id, Product product){
        final Product entity = repository.findById(id).orElseThrow(() -> new NotFoundException(id));

        if(product.getCode() !=null){
            entity.setCode(product.getCode());
        }

        if (product.getPrice() != null) {
            entity.setPrice(product.getPrice());
        }

        if(product.getPrice() != null){
            entity.setPrice(product.getPrice());
        }
        return repository.save(entity);
    }

    public void delete(Long id){
        final Product product = this.repository.findById(id).orElseThrow(() -> new NotFoundException(id));
        this.repository.delete(product);
    }


}
