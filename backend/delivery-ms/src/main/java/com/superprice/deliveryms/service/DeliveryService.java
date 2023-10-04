package com.superprice.deliveryms.service;


import com.superprice.deliveryms.dto.DeliveryRequest;
import com.superprice.deliveryms.dto.OrderRequest;
import com.superprice.deliveryms.dto.TimeSlotDTO;
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

    List<TimeSlotDTO> getTimeSlots();

    Delivery createDelivery(DeliveryRequest deliveryRequest);

//    List<DeliveryRequest> getDeliveriesByEmail(String email); returns the entire delivery

    List<Integer> getDeliveriesByEmail(String email);

    TimeSlotDTO getTimeslotById(int id);

    DeliveryRequest getDeliveryById(int deliveryId);
}
