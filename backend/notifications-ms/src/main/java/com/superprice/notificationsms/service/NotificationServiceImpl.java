package com.superprice.notificationsms.service;

import com.superprice.notificationsms.model.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Lazy;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;

import java.util.Properties;

@Service
public class NotificationServiceImpl implements NotificationService{

    @Autowired
//    @Lazy
    private JavaMailSender emailSender;

    @Override
    public Notification generic(int userId) {
        return new Notification("Suspicious Login", "A login from a foreign location has been attempted on your account.", "generic", 12212);
    }
    @Override
    public Notification delivery(int userId) {
        return new Notification("SuperPrice Order #13313 Arrival", "You're order from SuperPrice containing Milk, Eggs & 13 other items has arrived at" +
                "13 Windemere Place VIC.", "delivery", 13313);
    }
    @Override
    public Notification pricedrop(int userId) {
        return new Notification("Specials available from SuperPrice", "The prices on items or stores you have visited has been updated. You can now save" +
                " on the things you love such as 'Paper Towels'.", "pricedrop", 31131);
    }
//    @Bean
//    public JavaMailSender getJavaMailSender() {
//        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
////        mailSender.setHost("smtp.gmail.com");
////        mailSender.setPort(587);
//
////        mailSender.setUsername("my.gmail@gmail.com");
////        mailSender.setPassword("password");
//
//        Properties props = mailSender.getJavaMailProperties();
//        props.put("mail.transport.protocol", "smtp");
//        props.put("mail.smtp.auth", "true");
//        props.put("mail.smtp.starttls.enable", "true");
//        props.put("mail.debug", "true");
//
//        return mailSender;
//    }

    public void sendSimpleMessage(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("italiano.antzo@gmail.com");
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        emailSender.send(message);
    }

}
