package com.example.similarproducts.infrastructure.client.mapper;

import com.example.similarproducts.domain.model.ProductDetail;
import com.example.similarproducts.infrastructure.client.dto.ProductExternalResponse;
import org.springframework.stereotype.Component;

@Component
public class ProductExternalMapper {

    public ProductDetail toDomain(ProductExternalResponse response) {
        if (response == null) return null;
        
        return ProductDetail.builder()
                .id(response.getId())
                .name(response.getName())
                .price(response.getPrice())
                .availability(response.getAvailability())
                .build();
    }
}
