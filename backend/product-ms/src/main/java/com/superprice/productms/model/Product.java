package com.superprice.productms.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity(name = "product")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ProductID")
    private int productId;
    @Column(name = "Name")
    private String name;
    @Column(name = "Description")
    private String description;
    @Column(name = "Category")
    private String category;
    @Column(name = "ImageURL")
    private String imageURL;
    @Column(name = "Weight")
    private double weight;
//    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
//    private List<String> Supermarkets;

//    public Product(int productID, String name, String description, int categoryID, String imageURL) {
//        this.productID = productID;
//        this.name = name;
//        this.description = description;
//        this.categoryID = categoryID;
//        this.imageURL = imageURL;
//    }

//    public int getProductID() {
//        return productID;
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public String getDescription() {
//        return description;
//    }

//    public int getCategoryID() {
//        return categoryID;
//    }

//    public String getImageURL() {
//        return imageURL;
//    }


}
