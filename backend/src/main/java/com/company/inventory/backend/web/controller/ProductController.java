package com.company.inventory.backend.web.controller;

import com.company.inventory.backend.core.exceptions.NotFoundException;
import com.company.inventory.backend.domain.persistence.entity.Product;
import com.company.inventory.backend.domain.persistence.repository.ProductRepository;
import com.company.inventory.backend.domain.persistence.service.ProductService;
import com.company.inventory.backend.web.dto.ProductDTO;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin
public class ProductController {

    private final ProductRepository repository;

    private final ProductService service;

    public ProductController(ProductRepository repository, ProductService service){
        this.repository = repository;
        this.service = service;
    }

    @GetMapping
    public List<Product> findAll(){
        return repository.findAll();
    }

    @PostMapping
    public  Product create(@RequestBody @Validated ProductDTO product){
        return this.service.create(product);
    }

    @PutMapping("/{id}")
    public Product update(@PathVariable("id") Long id, @RequestBody @Validated ProductDTO body){
        return this.service.upadate(id, body);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long id){
        this.service.delete(id);
    }

    @GetMapping("/{id}")
    public Product findById(@PathVariable Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new NotFoundException(id));
    }


}
