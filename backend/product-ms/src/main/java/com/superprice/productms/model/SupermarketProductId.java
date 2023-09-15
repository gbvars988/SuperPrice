package com.superprice.productms.model;

import java.io.Serializable;
import java.util.Objects;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class SupermarketProductId implements Serializable {
    private int supermarketId;
    private int productId;

    // Getters, setters, hashCode, and equals methods
}