package com.superprice.deliveryms.repository;

import com.superprice.deliveryms.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Integer> {

}
