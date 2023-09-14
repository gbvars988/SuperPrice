package com.superprice.productms.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.*;

//@Entity(name = "supermarket")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Supermarket {
    private String Name;
    private double Price;
//@Id
//@GeneratedValue

    private int SupermarketID;
//
//    public Supermarket(String name, double price) {
//        this.id = id;
//        this.name = name;
//        this.price = price;
//    }

//    public String getSupermarket() {
//        return supermarket;
//    }

//    public double getPrice() {
//        return price;
//    }
}
