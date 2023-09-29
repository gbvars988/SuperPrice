package com.superprice.notificationsms.controller;

//import com.superprice.notificationsms.dto.Notification;
import com.superprice.notificationsms.dto.NotificationDto;
import com.superprice.notificationsms.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("notifications")
public class NotificationController {

    private final NotificationService notificationService;
    @Autowired
    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

//    @GetMapping("/delivery/{user_id}")
//    public ResponseEntity<Notification> NotifyDelivery(@PathVariable int user_id) {
//        Notification notification = notificationService.delivery(user_id);
//        return ResponseEntity.ok(notification);
//    }
//    @GetMapping("/pricedrop/{user_id}")
//    public ResponseEntity<Notification> NotifyPriceDrop(@PathVariable int user_id) {
//        Notification notification = notificationService.pricedrop(user_id);
//        return ResponseEntity.ok(notification);
//    }

//    @GetMapping("/generic/{user_id}")
//    public ResponseEntity<Notification> NotifyGeneric(@PathVariable int user_id) {
//        Notification notification = notificationService.generic(user_id);
//        return ResponseEntity.ok(notification);
//    }
    /**HTTP Method: Post
     * Endpoint: "/notifications/pricedrop
     * Description: The endpoint sends the user a notification informing them of a product's new price.
     * @param request json with attributes regarding product and user details. See Notification dto.
     * @return to do
     */
    @PostMapping("/pricedrop")
    public ResponseEntity<?> NotifyPriceDrop(@RequestBody NotificationDto notificationDto) {
        notificationService.sendPriceDropNotification(notificationDto);
        return ResponseEntity.ok().build();
    }
}
