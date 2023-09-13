package com.superprice.deliveryms.repository;

import com.superprice.deliveryms.model.Delivery;

import java.util.Optional;

public interface DeliveryRepository {
    public Optional<Delivery> findById(int orderNo);
}
