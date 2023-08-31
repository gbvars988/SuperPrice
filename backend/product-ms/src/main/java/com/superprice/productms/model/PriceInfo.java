package com.superprice.productms.model;

public class PriceInfo {
    private String supermarket;
    private int price;

    public PriceInfo(String supermarket_name, int price) {
        this.supermarket = supermarket_name;
        this.price = price;
    }

    public String getSupermarket() {
        return supermarket;
    }

    public int getPrice() {
        return price;
    }
}
