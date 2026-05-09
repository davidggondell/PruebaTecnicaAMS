package com.example.similarproducts.infrastructure.client.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductExternalResponse {
    private String id;
    private String name;
    private Double price;
    private Boolean availability;
}
