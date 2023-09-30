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

//    @Override
//    public Notification generic(int userId) {
//        return new Notification("Suspicious Login", "A login from a foreign location has been attempted on your account.", "generic", 12212);
//    }
//    @Override
//    public Notification delivery(int userId) {
//        return new Notification("SuperPrice Order #13313 Arrival", "You're order from SuperPrice containing Milk, Eggs & 13 other items has arrived at" +
//                "13 Windemere Place VIC.", "delivery", 13313);
//    }
//    @Override
//    public Notification pricedrop(int userId) {
//        return new Notification("Specials available from SuperPrice", "The prices on items or stores you have visited has been updated. You can now save" +
//                " on the things you love such as 'Paper Towels'.", "pricedrop", 31131);
//    }


    public void sendPriceDropNotification(NotificationDto notificationDto) {
        SimpleMailMessage message = new SimpleMailMessage();
        String text = "Hi " + notificationDto.getFirstName() + " " + notificationDto.getLastName() + ", we would like to inform that the price of " +
                notificationDto.getProductName() + " has been reduced from $"
                + notificationDto.getPrevPrice() + " to $" + notificationDto.getNewPrice() + " at " + notificationDto.getSupermarket() + ".";
//        message.setFrom("superprice.team01@gmail.com");
        message.setTo(notificationDto.getUserEmail());
        message.setSubject("Price Drop");
        message.setText(text);
        emailSender.send(message);
    }

}
