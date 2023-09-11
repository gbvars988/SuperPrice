package com.superprice.deliveryms.model;

import java.time.LocalDateTime;

public class Delivery {
    private String address;
    private String items;
    int userId;
    LocalDateTime timeslot;
    int orderNo;

    public Delivery(String address, String items, int userId, LocalDateTime timeslot) {
        this.address = address;
        this.items = items;
        this.userId = userId;
        this.timeslot = timeslot;
    }

    public String getAddress(){return address;}
    public String getItems(){return items;}
    public int getUserId(){return userId;}
    public LocalDateTime getTimeslot(){return timeslot;}

    public int getOrderNo(){return orderNo;}
}
