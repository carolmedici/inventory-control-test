package com.company.inventory.backend.web.controller;

import com.company.inventory.backend.domain.persistence.entity.Product;
import com.company.inventory.backend.domain.persistence.repository.ProductRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin
public class ProductController {

    private final ProductRepository repository;

    public ProductController(ProductRepository repository){
        this.repository = repository;
    }

    @GetMapping
    public List<Product> findAll(){
        return repository.findAll();
    }

    @PostMapping
    public  Product create(@RequestBody Product product){
        return repository.save(product);
    }


}
