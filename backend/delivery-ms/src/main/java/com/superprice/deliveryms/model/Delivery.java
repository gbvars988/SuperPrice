package com.superprice.deliveryms.model;

import java.time.LocalDateTime;

public class Delivery {
    private String address;
    private String items;
    private int userId;
    private String timeslot;
    private int orderNo;

    public Delivery(int orderNo, String address, String items, String timeslot, int userId) {
        this.orderNo = orderNo;
        this.address = address;
        this.items = items;
        this.timeslot = timeslot;
        this.userId = userId;
    }

    public String getAddress(){return address;}
    public String getItems(){return items;}
    public int getUserId(){return userId;}
    public String getTimeslot(){return timeslot;}

    public int getOrderNo(){return orderNo;}
}
