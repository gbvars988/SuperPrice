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

    /**
     * HTTP Method: POST
     * Endpoint: "/delivery/createorder"
     * Description: The endpoint creates an order in the db
     * @param orderRequest object
     *              i.e. {
     *                  "userId": 12345,
     *                  "orderItems": [
     *                          {
     *                              "productId": 1,
     *                              "quantity": 3
     *                          },
     *                          {
     *                              "productId": 2,
     *                              "quantity": 5
     *                          }

     *                   ]
     *                    }
     * @return The order that was created in json with orderid, userid, datecreated
     * e.g.: http://localhost:8082/delivery-service/delivery/createorder
     */
    @PostMapping("/createorder")
    public ResponseEntity<?> createOrder(@RequestBody OrderRequest orderRequest) {
        Order savedOrder = deliveryService.createOrder(orderRequest);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedOrder);
    }

    /**
     * HTTP Method: GET
     * Endpoint: "/delivery/timeslots"
     * Description: The endpoint retrieves times for delivery
     * @param none
     * @return returns a list of times available to choose:
     *     {
     *         "timeSlotId": 1,
     *         "startTime": "09:00:00",
     *         "endTime": "10:00:00"
     *     },
     *     ... and so on until 22:00:00
     * e.g.: http://localhost:8082/delivery-service/delivery/timeslots
     */
    @GetMapping("/timeslots")
    public ResponseEntity<List<TimeSlotDTO>> getTimeSlots() {
        return new ResponseEntity<>(deliveryService.getTimeSlots(), HttpStatus.OK);
    }


    /**
     * HTTP Method: POST
     * Endpoint: "/delivery/requestdelivery"
     * Description: The endpoint creates a delivery in DB
     * @param DeliveryRequest json
     *        e.g.
     * {
     *     "orderId": 1,
     *     "address": "123 Swanston St, Melbourne",
     *     "email": "john.doe@gmail.com",
     *     "timeSlotId": 2,
     *     "deliveryStatus": "Scheduled"
     * }
     * @return returns a view of what was created in json.
     * e.g.: http://localhost:8082/delivery-service/delivery/requestdelivery
     */
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

    /**
     * HTTP Method: GET
     * Endpoint: "/delivery/getdeliveriesbyemail/{email}"
     * Description: The endpoint retrieves delivery ids associated with an email.
     * @param email path variable
     * @return returns a list of integers representing delivery IDs associated with email.
     * e.g.: http://localhost:8082/delivery-serivce/delivery/getdeliveriesbyemail/{email}
     */
    @GetMapping("/getdeliveriesbyemail/{email}")
    public ResponseEntity<List<Integer>> getDeliveriesByEmail(@PathVariable String email) {
        List<Integer> deliveryIds = deliveryService.getDeliveriesByEmail(email);
        return ResponseEntity.ok(deliveryIds);
    }

    /**
     * HTTP Method: GET
     * Endpoint: "/delivery/getdeliverybyid/{delivery_id}"
     * Description: The endpoint retrieves the full delivery instance from DB by delivery ID.
     * @param delivery_id path variable
     * @return returns a delivery json with details:
     *              orderId, address, email, timeslotID, deliveryStatus
     * e.g.: http://localhost:8082/delivery-service/delivery/getdeliveriesbyemail/{email}
     */
    @GetMapping("/getdeliverybyid/{delivery_id}")
    public ResponseEntity<DeliveryRequest> getDeliveryById(@PathVariable int delivery_id) {
        return new ResponseEntity<>(deliveryService.getDeliveryById(delivery_id), HttpStatus.OK);
    }


    /**
     * HTTP Method: GET
     * Endpoint: "/delivery/timeslots/{timeslot_id}"
     * Description: The endpoint retrieves the delivery timeslot in hours by timeslot ID
     * @param timeslot_id path variable
     * @return a timeslot jason with 'startTime' and 'endTime'.
     * e.g.: http://localhost:8082/delivery-service/delivery/timeslots/1
     * will return:
     *    {
     *     "timeSlotId": 1,
     *     "startTime": "09:00:00",
     *     "endTime": "10:00:00"
     *    }
     */
    @GetMapping("/timeslots/{timeslot_id}")
    public ResponseEntity<TimeSlotDTO> getTimeslotById(@PathVariable int timeslot_id) {
        return new ResponseEntity<>(deliveryService.getTimeslotById(timeslot_id), HttpStatus.OK);
    }
}
