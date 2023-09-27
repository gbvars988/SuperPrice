package com.superprice.productms.dto;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PriceUpdateRequest {
    private int productID;
    private int supermarketID;
    private double newPrice;
}
