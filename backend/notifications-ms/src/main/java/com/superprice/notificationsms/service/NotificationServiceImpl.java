package com.superprice.notificationsms.service;

//import com.superprice.notificationsms.dto.Notification;
import com.superprice.notificationsms.dto.NotificationDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class NotificationServiceImpl implements NotificationService{

    @Autowired
    private JavaMailSender emailSender;

    public void sendPriceDropNotification(NotificationDto notificationDto) {
        SimpleMailMessage message = new SimpleMailMessage();
        String text = "Hi " + notificationDto.getFirstName() + " " + notificationDto.getLastName() + ", we would like to inform that the price of " +
                notificationDto.getProductName() + " has been reduced from $"
                + notificationDto.getPrevPrice() + " to $" + notificationDto.getNewPrice() + " at " + notificationDto.getSupermarket() + ".";
        message.setTo(notificationDto.getUserEmail());
        message.setSubject("Price Drop");
        message.setText(text);
        emailSender.send(message);
    }

}
