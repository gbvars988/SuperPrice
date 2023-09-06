package com.superprice.productms.model;

public class Product {
    private int productID;
    private String name;
    private String description;
    private int categoryID;
    private String imageURL;

    public Product(int productID, String name, String description, int categoryID, String imageURL) {
        this.productID = productID;
        this.name = name;
        this.description = description;
        this.categoryID = categoryID;
        this.imageURL = imageURL;
    }

    public int getProductID() {
        return productID;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public int getCategoryID() {
        return categoryID;
    }

    public String getImageURL() {
        return imageURL;
    }
}
