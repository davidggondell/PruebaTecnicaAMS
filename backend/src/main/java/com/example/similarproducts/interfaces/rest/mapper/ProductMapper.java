package com.example.similarproducts.interfaces.rest.mapper;

import com.example.similarproducts.domain.model.ProductDetail;
import com.example.similarproducts.interfaces.rest.dto.ProductResponseDTO;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {

    public ProductResponseDTO toDto(ProductDetail domain) {
        if (domain == null) return null;
        
        return ProductResponseDTO.builder()
                .id(domain.getId())
                .name(domain.getName())
                .price(domain.getPrice())
                .availability(domain.getAvailability())
                .build();
    }
}
