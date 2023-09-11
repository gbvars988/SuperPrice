package com.superprice.deliveryms.controller;

import com.superprice.deliveryms.model.Delivery;
import com.superprice.deliveryms.service.DeliveryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("delivery")
public class DeliveryController {

    private final DeliveryService deliveryService;

    @Autowired
    public DeliveryController(DeliveryService deliveryService) {
        this.deliveryService = deliveryService;
    }
    @PostMapping("")
    public ResponseEntity<String> orderDelivery(@RequestBody Delivery orderDetails){
        deliveryService.orderDelivery("20 Paperbark Av Springfield 3121", "Lettuce(1), Zappos(2)", 2231, LocalDateTime.now());
        return ResponseEntity.ok("Order added successfully");
    }
    @GetMapping("/{orderNo}")
    public ResponseEntity<Delivery> getDelivery (@PathVariable int orderNo){
        return ResponseEntity.ok(deliveryService.deliveryInfo(orderNo));
    }
}
