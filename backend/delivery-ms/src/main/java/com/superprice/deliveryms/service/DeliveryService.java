package com.superprice.deliveryms.service;


import com.superprice.deliveryms.dto.OrderRequest;
import com.superprice.deliveryms.model.Delivery;
import com.superprice.deliveryms.model.Order;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


public interface DeliveryService {

//    void orderDelivery(String address, String items, int userId, LocalDateTime timeslot);
//
//    Optional<Delivery> deliveryInfo (int orderNo);

    Order createOrder(OrderRequest orderRequest);
}
