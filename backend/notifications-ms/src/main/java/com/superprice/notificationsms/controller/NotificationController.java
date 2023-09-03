package com.superprice.notificationsms.controller;

import com.superprice.notificationsms.model.Notification;
import com.superprice.notificationsms.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("notifications")
public class NotificationController {
    /**HTTP Method: GET
     * Endpoint: "/notifications/{type}/{user_id}
     * Description: The endpoint sends the user a notification to update them on changes to prices or when
     * a delivery has arrived.
     * @param userId
     * @return A notification of type generic (title, message)
     */
    private final NotificationService notificationService;
    @Autowired
    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping("/delivery/{user_id}")
    public ResponseEntity<Notification> NotifyDelivery(@PathVariable int user_id) {
        Notification notification = notificationService.delivery(user_id);
        return ResponseEntity.ok(notification);
    }@GetMapping("/pricedrop/{user_id}")
    public ResponseEntity<Notification> NotifyPriceDrop(@PathVariable int user_id) {
        Notification notification = notificationService.pricedrop(user_id);
        return ResponseEntity.ok(notification);
    }

    @GetMapping("/generic/{user_id}")
    public ResponseEntity<Notification> NotifyGeneric(@PathVariable int user_id) {
        Notification notification = notificationService.generic(user_id);
        return ResponseEntity.ok(notification);
    }
}
