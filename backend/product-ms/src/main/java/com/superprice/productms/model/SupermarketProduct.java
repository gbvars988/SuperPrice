package com.superprice.productms.model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Table(name = "supermarketproduct")
@IdClass(SupermarketProductId.class)  // Composite Primary Key class
public class SupermarketProduct {

    @Id
    @Column(name = "SupermarketID")
    private int supermarketId;

    @Id
    @Column(name = "ProductID")
    private int productId;

    @Column(name = "Price")
    private double price;

    @ManyToOne // (fetch = FetchType.LAZY)
    @JoinColumn(name = "SupermarketID", referencedColumnName = "SupermarketID", insertable = false, updatable = false)
    private Supermarket supermarket;

    @ManyToOne // (fetch = FetchType.LAZY)
    @JoinColumn(name = "ProductID", referencedColumnName = "ProductID", insertable = false, updatable = false)
    private Product product;

    // Getters and Setters
}