package com.superprice.deliveryms.controller;

import com.superprice.deliveryms.dto.DeliveryRequest;
import com.superprice.deliveryms.dto.OrderRequest;
import com.superprice.deliveryms.dto.TimeSlotDTO;
import com.superprice.deliveryms.model.Delivery;
import com.superprice.deliveryms.model.Order;
import com.superprice.deliveryms.service.DeliveryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("delivery")
public class DeliveryController {

    DeliveryService deliveryService;

    @Autowired
    public DeliveryController(DeliveryService deliveryService) {
        this.deliveryService = deliveryService;
    }

    @PostMapping("/createorder")
    public ResponseEntity<?> createOrder(@RequestBody OrderRequest orderRequest) {
        Order savedOrder = deliveryService.createOrder(orderRequest);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedOrder);
    }

    @GetMapping("/timeslots")
    public ResponseEntity<List<TimeSlotDTO>> getTimeSlots() {
        return new ResponseEntity<>(deliveryService.getTimeSlots(), HttpStatus.OK);
    }


    @PostMapping("/requestdelivery")
    public ResponseEntity<Delivery> createDelivery(@RequestBody DeliveryRequest deliveryRequest) {
        Delivery savedDelivery = deliveryService.createDelivery(deliveryRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedDelivery);
    }

//    @GetMapping("/getdeliveriesbyemail/{email}")
//    public ResponseEntity<List<DeliveryRequest>> getDeliveriesByEmail(@PathVariable String email) {
//        List<DeliveryRequest> deliveryRequests = deliveryService.getDeliveriesByEmail(email);
//        return ResponseEntity.ok(deliveryRequests);
//    }

    @GetMapping("/getdeliveriesbyemail/{email}")
    public ResponseEntity<List<Integer>> getDeliveriesByEmail(@PathVariable String email) {
        List<Integer> deliveryIds = deliveryService.getDeliveriesByEmail(email);
        return ResponseEntity.ok(deliveryIds);
    }
    @GetMapping("/getdeliverybyid/{delivery_id}")
    public ResponseEntity<DeliveryRequest> getDeliveryById(@PathVariable int delivery_id) {
        return new ResponseEntity<>(deliveryService.getDeliveryById(delivery_id), HttpStatus.OK);
    }


    @GetMapping("/timeslots/{timeslot_id}")
    public ResponseEntity<TimeSlotDTO> getTimeslotById(@PathVariable int timeslot_id) {
        return new ResponseEntity<>(deliveryService.getTimeslotById(timeslot_id), HttpStatus.OK);
    }
}
