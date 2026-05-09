package com.example.similarproducts.application.service;

import com.example.similarproducts.domain.exception.NoSimilarProductsFoundException;
import com.example.similarproducts.domain.exception.ProductExternalException;
import com.example.similarproducts.domain.model.ProductDetail;
import com.example.similarproducts.domain.port.in.ProductUseCase;
import com.example.similarproducts.domain.port.out.ProductExternalPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class SimilarProductsService implements ProductUseCase {

    private final ProductExternalPort productExternalPort;

    @Override
    public List<ProductDetail> getSimilarProducts(String productId) throws ProductExternalException, NoSimilarProductsFoundException {
        List<String> similarIds = productExternalPort.getSimilarProductIds(productId)
                .orElseThrow(() -> new NoSimilarProductsFoundException(productId));
        
        List<ProductDetail> result = productExternalPort.getMultipleProductDetails(similarIds);

        if (result.isEmpty()) {
            throw new NoSimilarProductsFoundException(productId);
        }

        return result;
    }
}
