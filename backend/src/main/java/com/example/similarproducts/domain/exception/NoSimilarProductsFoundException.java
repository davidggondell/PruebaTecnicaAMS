package com.example.similarproducts.domain.exception;

import lombok.Getter;

@Getter
public class NoSimilarProductsFoundException extends RuntimeException {
    private final String productId;

    public NoSimilarProductsFoundException(String productId) {
        super(String.format("Couldn't find any similar products for the product %s", productId));
        this.productId = productId;
    }
}
