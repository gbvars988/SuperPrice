package com.superprice.productms.model;
import jakarta.persistence.*;

@Entity
//@Table(name = "SupermarketProduct")
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SupermarketID", referencedColumnName = "SupermarketID", insertable = false, updatable = false)
    private Supermarket supermarket;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ProductID", referencedColumnName = "ProductID", insertable = false, updatable = false)
    private Product product;

    // Getters and Setters
}