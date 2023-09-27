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
    void sendSimpleMessage(String to, String subject, String text);
}
