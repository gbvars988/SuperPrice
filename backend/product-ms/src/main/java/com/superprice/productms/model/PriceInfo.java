package com.superprice.productms.model;

public class PriceInfo {
    private String supermarket;
    private double price;

    public PriceInfo(String supermarket_name, double price) {
        this.supermarket = supermarket_name;
        this.price = price;
    }

    public String getSupermarket() {
        return supermarket;
    }

    public double getPrice() {
        return price;
    }
}
