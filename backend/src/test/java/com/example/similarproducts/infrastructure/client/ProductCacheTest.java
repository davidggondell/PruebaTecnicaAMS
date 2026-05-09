package com.example.similarproducts.infrastructure.client;

import com.example.similarproducts.domain.model.ProductDetail;
import com.example.similarproducts.infrastructure.client.dto.ProductExternalResponse;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.web.client.RestClient;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@SpringBootTest
class ProductCacheTest {

    @TestConfiguration
    static class TestConfig {
        @Bean
        @Primary
        public RestClient mockRestClient() {
            RestClient mock = Mockito.mock(RestClient.class, Mockito.RETURNS_DEEP_STUBS);
            when(mock.get().uri(anyString()).retrieve().body(ProductExternalResponse.class))
                    .thenReturn(new ProductExternalResponse("1", "Product 1", 10.0, true));
            return mock;
        }
    }

    @Autowired
    private ProductCacheableClient cacheableClient;

    @Autowired
    private RestClient restClient;

    @Test
    void shouldCacheAndNotCallRestClientTwice() {
        clearInvocations(restClient);

        Optional<ProductDetail> result1 = cacheableClient.getProductDetail("1");
        Optional<ProductDetail> result2 = cacheableClient.getProductDetail("1");

        assertTrue(result1.isPresent());
        assertTrue(result2.isPresent());
        assertEquals("Product 1", result1.get().getName());
        assertEquals("Product 1", result2.get().getName());

        verify(restClient, times(1)).get();
    }
}
