package com.example.similarproducts.infrastructure.client;

import com.example.similarproducts.domain.exception.ProductExternalException;
import com.example.similarproducts.domain.model.ProductDetail;
import com.example.similarproducts.infrastructure.client.dto.ProductExternalResponse;
import com.example.similarproducts.infrastructure.client.mapper.ProductExternalMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class ProductCacheableClient {

    private final RestClient restClient;
    private final ProductExternalMapper externalMapper;

    @Value("${external.api.url}")
    private String baseUrl;

    @Cacheable(value = "similarIds", key = "#productId")
    public Optional<List<String>> getSimilarProductIds(String productId) throws ProductExternalException {
        String url = String.format("%s/product/%s/similarids", baseUrl, productId);
        try {
            List<String> ids = restClient.get()
                    .uri(url)
                    .retrieve()
                    .body(new ParameterizedTypeReference<>() {
                    });
            return Optional.ofNullable(ids);
        } catch (HttpClientErrorException.NotFound e) {
            return Optional.empty();
        } catch (Exception e) {
            throw new ProductExternalException(productId, e);
        }
    }

    @Cacheable(value = "productDetails", key = "#productId")
    public Optional<ProductDetail> getProductDetail(String productId) throws ProductExternalException {
        String url = String.format("%s/product/%s", baseUrl, productId);
        try {
            ProductExternalResponse response = restClient.get()
                    .uri(url)
                    .retrieve()
                    .body(ProductExternalResponse.class);
            return Optional.ofNullable(response).map(externalMapper::toDomain);
        } catch (HttpClientErrorException.NotFound e) {
            return Optional.empty();
        } catch (Exception e) {
            throw new ProductExternalException(productId, e);
        }
    }
}
