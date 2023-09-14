package com.superprice.productms.dto;

import com.superprice.productms.model.Supermarket;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductDto {
    private int ProductID;
    private String Name;
    private String Description;
    private String Category;
    private String ImageURL;
    private int Weight;
    private List<Supermarket> Supermarkets;
}
