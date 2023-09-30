package com.superprice.deliveryms.repository;

import com.superprice.deliveryms.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {

}
