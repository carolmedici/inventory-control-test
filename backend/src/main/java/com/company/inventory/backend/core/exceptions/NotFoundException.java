package com.company.inventory.backend.core.exceptions;

import com.company.inventory.backend.domain.persistence.entity.Product;
import lombok.Getter;

@Getter
public class NotFoundException  extends RuntimeException{
    public NotFoundException(String message){
        super(message);
    }

    public NotFoundException(final Long id) {
        super("Product with id " + id + " not founded");
    }

}
