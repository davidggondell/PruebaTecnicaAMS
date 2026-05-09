package com.example.similarproducts.domain.port.in;

import com.example.similarproducts.domain.exception.NoSimilarProductsFoundException;
import com.example.similarproducts.domain.exception.ProductExternalException;
import com.example.similarproducts.domain.model.ProductDetail;

import java.util.List;

public interface ProductUseCase {
    List<ProductDetail> getSimilarProducts(String productId) throws ProductExternalException, NoSimilarProductsFoundException;
}
