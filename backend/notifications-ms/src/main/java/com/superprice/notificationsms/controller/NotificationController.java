package com.superprice.notificationsms.controller;

import com.superprice.notificationsms.dto.NotificationDto;
import com.superprice.notificationsms.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import javax.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("notifications")
public class NotificationController {

    private final NotificationService notificationService;
    @Autowired
    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    /**
     * HTTP Method: Post
     * Endpoint: "/notifications/pricedrop
     * Description: The endpoint sends the user a notification informing them of a product's new price.
     *
     * @param notificationDto JSON with attributes regarding product and user details. See NotificationDto.
     * @return HTTP 200 response if successful, otherwise a 400 (Bad Request) response.
     */
    @PostMapping("/pricedrop")
    public ResponseEntity<?> NotifyPriceDrop(@Valid @RequestBody NotificationDto notificationDto) {
        if (isValid(notificationDto)) {
            notificationService.sendPriceDropNotification(notificationDto);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    // Validation method to check if the parameters meet the criteria for a valid request
    private boolean isValid(NotificationDto notificationDto) {
        return notificationDto != null
                && notificationDto.getUserEmail() != null && !notificationDto.getUserEmail().isEmpty()
                && notificationDto.getPrevPrice() >= 0.0 // Ensure previous price is non-negative
                && notificationDto.getNewPrice() > 0.0;   // Ensure new price is positive
    }
}
