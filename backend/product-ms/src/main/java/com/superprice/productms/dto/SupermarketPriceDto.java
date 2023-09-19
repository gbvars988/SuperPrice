package com.superprice.productms.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SupermarketPriceDto {
        private int supermarketId;
        private String supermarketName;
        private double price;
}
