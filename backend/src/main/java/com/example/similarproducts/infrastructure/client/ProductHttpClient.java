package com.example.similarproducts.infrastructure.client;

import com.example.similarproducts.domain.exception.ProductExternalException;
import com.example.similarproducts.domain.model.ProductDetail;
import com.example.similarproducts.domain.port.out.ProductExternalPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

import java.util.concurrent.ExecutorService;

@Component
@RequiredArgsConstructor
@Slf4j
public class ProductHttpClient implements ProductExternalPort {

    private final ProductCacheableClient cacheableClient;
    private final ExecutorService virtualExecutor;

    @Override
    public Optional<List<String>> getSimilarProductIds(String productId) throws ProductExternalException {
        return cacheableClient.getSimilarProductIds(productId);
    }

    @Override
    public Optional<ProductDetail> getProductDetail(String productId) throws ProductExternalException {
        return cacheableClient.getProductDetail(productId);
    }

    @Override
    public List<ProductDetail> getMultipleProductDetails(List<String> productIds) {
        var futures = productIds.stream()
                .map(id -> virtualExecutor.submit(() -> {
                    try {
                        Optional<ProductDetail> detail = cacheableClient.getProductDetail(id);
                        if (detail.isEmpty()) {
                            log.warn("Partial failure: Product with ID {} not found", id);
                        }
                        return detail;
                    } catch (ProductExternalException e) {
                        log.warn("Partial failure: {}", e.getMessage());
                        return Optional.<ProductDetail>empty();
                    }
                }))
                .toList();

        return futures.stream()
                .map(future -> {
                    try {
                        return future.get();
                    } catch (Exception e) {
                        return Optional.<ProductDetail>empty();
                    }
                })
                .flatMap(Optional::stream)
                .toList();
    }
}
