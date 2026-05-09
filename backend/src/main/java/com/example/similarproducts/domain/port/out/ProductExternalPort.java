package com.example.similarproducts.domain.port.out;

import com.example.similarproducts.domain.exception.ProductExternalException;
import com.example.similarproducts.domain.model.ProductDetail;

import java.util.List;
import java.util.Optional;

public interface ProductExternalPort {
    Optional<List<String>> getSimilarProductIds(String productId) throws ProductExternalException;
    Optional<ProductDetail> getProductDetail(String productId) throws ProductExternalException;
    List<ProductDetail> getMultipleProductDetails(List<String> productIds);
}
