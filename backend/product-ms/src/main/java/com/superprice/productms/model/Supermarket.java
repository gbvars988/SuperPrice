package com.superprice.productms.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Supermarket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (name = "SupermarketID")
    private int supermarketId;
    @Column(name = "Name")
    private String name;
}