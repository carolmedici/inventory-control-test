package com.company.inventory.backend.web.controller;

import com.company.inventory.backend.core.exceptions.NotFoundException;
import com.company.inventory.backend.domain.persistence.entity.Product;
import com.company.inventory.backend.domain.persistence.entity.ProductComposition;
import com.company.inventory.backend.domain.persistence.entity.RawMaterial;
import com.company.inventory.backend.domain.persistence.repository.ProductCompositionRepository;
import com.company.inventory.backend.domain.persistence.repository.ProductRepository;
import com.company.inventory.backend.domain.persistence.repository.RawMaterialRepository;
import com.company.inventory.backend.web.dto.ProductCompositionRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product-composition")
@CrossOrigin
public class ProductCompositionController {

    private final ProductRepository productRepository;
    private final RawMaterialRepository rawMaterialRepository;
    private final ProductCompositionRepository productCompositionRepository;

    public ProductCompositionController(ProductRepository productRepository, RawMaterialRepository rawMaterialRepository, ProductCompositionRepository productCompositionRepository){
        this.productCompositionRepository = productCompositionRepository;
        this.productRepository = productRepository;
        this.rawMaterialRepository = rawMaterialRepository;
    }

    @PostMapping
    public ProductComposition create(@RequestBody ProductCompositionRequest request) {

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        RawMaterial rawMaterial = rawMaterialRepository.findById(request.getRawMaterialId())
                .orElseThrow(() -> new RuntimeException("Raw material not found"));

        ProductComposition composition =
                productCompositionRepository
                        .findByProductIdAndRawMaterialId(
                                product.getId(),
                                rawMaterial.getId()
                        )
                        .orElseGet(() -> {
                            ProductComposition pc = new ProductComposition();
                            pc.setProduct(product);
                            pc.setRawMaterial(rawMaterial);
                            pc.setRequiredQuantity(0);
                            return pc;
                        });

        composition.setRequiredQuantity(
                composition.getRequiredQuantity() + request.getRequiredQuantity()
        );

        return productCompositionRepository.save(composition);
    }


    @GetMapping ("/product/{productId}")
    public List< ProductComposition > listByProduct  (@PathVariable Long productId){
        return productCompositionRepository.findByProductId(productId);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long id){
        productCompositionRepository.deleteById(id);
    }


}
