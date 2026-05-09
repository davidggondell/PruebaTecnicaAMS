package com.example.similarproducts.domain.exception;

import lombok.Getter;

@Getter
public class ProductExternalException extends RuntimeException {
    private final String productId;

    public ProductExternalException(String productId, Throwable cause) {
        super(String.format("External API failure for product %s", productId), cause);
        this.productId = productId;
    }
}
