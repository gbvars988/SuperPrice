package com.superprice.notificationsms.controller;

import com.superprice.notificationsms.dto.NotificationDto;
import com.superprice.notificationsms.service.NotificationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class NotificationControllerTest {

    @InjectMocks
    private NotificationController notificationController;

    @Mock
    private NotificationService notificationService;

    @BeforeEach
    void setUp() {
        this.notificationService = mock(NotificationService.class);
        this.notificationController = new NotificationController(this.notificationService);
    }

    @Test
    void testNotifyPriceDrop() {
        NotificationDto notificationDto = new NotificationDto();
        notificationDto.setUserEmail("test@example.com");
        notificationDto.setFirstName("John");
        notificationDto.setLastName("Doe");
        notificationDto.setProductName("Product");
        notificationDto.setPrevPrice(10.0);
        notificationDto.setNewPrice(8.0);
        notificationDto.setSupermarket("Supermarket");

        doNothing().when(notificationService).sendPriceDropNotification(notificationDto);

        ResponseEntity<?> response = notificationController.NotifyPriceDrop(notificationDto);

        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void testNotifyPriceDropWithNullDto() {
        NotificationDto notificationDto = null;

        ResponseEntity<?> response = notificationController.NotifyPriceDrop(notificationDto);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());

    }

    @Test
    void testNotifyPriceDropWithEmptyEmail() {
        NotificationDto notificationDto = new NotificationDto();
        notificationDto.setUserEmail("");
        notificationDto.setFirstName("John");
        notificationDto.setLastName("Doe");
        notificationDto.setProductName("Product");
        notificationDto.setPrevPrice(10.0);
        notificationDto.setNewPrice(8.0);
        notificationDto.setSupermarket("Supermarket");

        ResponseEntity<?> response = notificationController.NotifyPriceDrop(notificationDto);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());

    }

    @Test
    void testNotifyPriceDropWithInvalidPrices() {
        NotificationDto notificationDto = new NotificationDto();
        notificationDto.setUserEmail("test@example.com");
        notificationDto.setFirstName("John");
        notificationDto.setLastName("Doe");
        notificationDto.setProductName("Product");
        notificationDto.setPrevPrice(-10.0); // Negative previous price
        notificationDto.setNewPrice(8.0);
        notificationDto.setSupermarket("Supermarket");

        ResponseEntity<?> response = notificationController.NotifyPriceDrop(notificationDto);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());

    }
}
