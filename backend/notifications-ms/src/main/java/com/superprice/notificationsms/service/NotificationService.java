package com.superprice.notificationsms.service;

//import com.superprice.notificationsms.dto.Notification;
import com.superprice.notificationsms.dto.NotificationDto;

/** The NotificationService likely won't
 * need its own repository. The NotificationService
 * implementation will interact with the users db instead
 */
public interface NotificationService {
//    Notification generic(int userId);
//    Notification delivery(int userId);
//    Notification pricedrop(int userId);
    void sendPriceDropNotification(NotificationDto notificationDto);
}
