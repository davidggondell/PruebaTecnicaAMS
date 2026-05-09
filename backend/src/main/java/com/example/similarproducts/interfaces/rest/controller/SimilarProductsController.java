package com.example.similarproducts.interfaces.rest.controller;

import com.example.similarproducts.domain.port.in.ProductUseCase;
import com.example.similarproducts.interfaces.rest.dto.ProductResponseDTO;
import com.example.similarproducts.interfaces.rest.mapper.ProductMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
public class SimilarProductsController {

    private final ProductUseCase productUseCase;
    private final ProductMapper productMapper;

    @GetMapping("/{productId}/similar")
    public ResponseEntity<List<ProductResponseDTO>> getSimilarProducts(@PathVariable String productId) {
        List<ProductResponseDTO> result = productUseCase.getSimilarProducts(productId)
                .stream()
                .map(productMapper::toDto)
                .toList();
        
        return ResponseEntity.ok(result);
    }
}
