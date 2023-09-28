package com.superprice.notificationsms.service;

import com.superprice.notificationsms.model.Notification;

/** The NotificationService likely won't
 * need its own repository. The NotificationService
 * implementation will interact with the users db instead
 */
public interface NotificationService {
    Notification generic(int userId);
    Notification delivery(int userId);
    Notification pricedrop(int userId);
    void sendPriceDropNotification(String to, String productName, double prev_price, double new_price, String supermarket);
}
