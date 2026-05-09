package com.example.similarproducts.interfaces.rest.controller;

import com.example.similarproducts.domain.model.ProductDetail;
import com.example.similarproducts.domain.port.in.ProductUseCase;
import com.example.similarproducts.interfaces.rest.dto.ProductResponseDTO;
import com.example.similarproducts.interfaces.rest.mapper.ProductMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(SimilarProductsController.class)
class SimilarProductsControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private ProductUseCase productUseCase;

    @MockitoBean
    private ProductMapper productMapper;

    @Test
    void shouldReturnOkAndProductList() throws Exception {
        String productId = "1";
        ProductDetail mockProduct = new ProductDetail("2", "Product 2", 19.99, true);
        ProductResponseDTO mockDto = new ProductResponseDTO("2", "Product 2", 19.99, true);

        when(productUseCase.getSimilarProducts(productId)).thenReturn(List.of(mockProduct));
        when(productMapper.toDto(any(ProductDetail.class))).thenReturn(mockDto);

        mockMvc.perform(get("/product/{productId}/similar", productId)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].id").value("2"))
                .andExpect(jsonPath("$[0].name").value("Product 2"))
                .andExpect(jsonPath("$[0].price").value(19.99));
    }
}
