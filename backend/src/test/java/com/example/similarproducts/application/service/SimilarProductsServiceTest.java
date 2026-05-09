package com.example.similarproducts.application.service;

import com.example.similarproducts.domain.model.ProductDetail;
import com.example.similarproducts.domain.port.out.ProductExternalPort;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class SimilarProductsServiceTest {

    @Mock
    private ProductExternalPort productExternalPort;

    @InjectMocks
    private SimilarProductsService similarProductsService;

    @Test
    void shouldReturnSimilarProductsSuccessfully() {
        String productId = "1";
        List<String> similarIds = List.of("2", "3");
        ProductDetail detail2 = new ProductDetail("2", "Product 2", 10.0, true);
        ProductDetail detail3 = new ProductDetail("3", "Product 3", 15.0, true);

        when(productExternalPort.getSimilarProductIds(productId)).thenReturn(Optional.of(similarIds));
        when(productExternalPort.getMultipleProductDetails(similarIds)).thenReturn(List.of(detail2, detail3));
        
        List<ProductDetail> result = similarProductsService.getSimilarProducts(productId);

        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals("Product 2", result.get(0).getName());
        assertEquals("Product 3", result.get(1).getName());
        
        verify(productExternalPort, times(1)).getSimilarProductIds(productId);
        verify(productExternalPort, times(1)).getMultipleProductDetails(similarIds);
    }

    @Test
    void shouldFilterOutMissingProducts() {
        String productId = "1";
        List<String> similarIds = List.of("2", "3");
        ProductDetail detail2 = new ProductDetail("2", "Product 2", 10.0, true);

        when(productExternalPort.getSimilarProductIds(productId)).thenReturn(Optional.of(similarIds));
        when(productExternalPort.getMultipleProductDetails(similarIds)).thenReturn(List.of(detail2));

        List<ProductDetail> result = similarProductsService.getSimilarProducts(productId);

        assertEquals(1, result.size());
        assertEquals("Product 2", result.get(0).getName());
    }
}
