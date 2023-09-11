package com.superprice.deliveryms.service;


import com.superprice.deliveryms.model.Delivery;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


public interface DeliveryService {

    void orderDelivery(String address, String items, int userId, LocalDateTime timeslot);

    Delivery deliveryInfo (int orderNo);
}
