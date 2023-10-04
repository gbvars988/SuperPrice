package com.superprice.deliveryms.controller;


import com.superprice.deliveryms.dto.DeliveryRequest;
import com.superprice.deliveryms.dto.OrderItemRequest;
import com.superprice.deliveryms.dto.OrderRequest;
import com.superprice.deliveryms.dto.TimeSlotDTO;
import com.superprice.deliveryms.model.Delivery;
import com.superprice.deliveryms.model.Order;
import com.superprice.deliveryms.model.TimeSlot;
import com.superprice.deliveryms.service.DeliveryService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.Month;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class DeliveryControllerTest {

    DeliveryController deliveryController;
    DeliveryService deliveryService;

    @BeforeEach
    void setup() {
        this.deliveryService = mock(DeliveryService.class);
        this.deliveryController = new DeliveryController(this.deliveryService);
    }

    @Test
    void createOrder_should_callCreateService() {
        // Create sample data
        OrderItemRequest orderItem1 = new OrderItemRequest();
        orderItem1.setProductId(1);
        orderItem1.setQuantity(2);

        OrderItemRequest orderItem2 = new OrderItemRequest();
        orderItem2.setProductId(2);
        orderItem2.setQuantity(3);

        List<OrderItemRequest> orderItems = Arrays.asList(orderItem1, orderItem2);

        // Create OrderRequest sample data
        OrderRequest orderRequest = new OrderRequest();
        orderRequest.setUserId(12345);
        orderRequest.setOrderItems(orderItems);

        // Create a mocked Order object
        Order mockedOrder = new Order();
        mockedOrder.setOrderId(1);
        mockedOrder.setUserId(12345);
        mockedOrder.setDateCreated(LocalDateTime.now());

        // Mock the service behavior
        when(deliveryService.createOrder(orderRequest)).thenReturn(mockedOrder);

        // Call the controller method
        ResponseEntity<?> response = deliveryController.createOrder(orderRequest);

        // Verify service method was called and check response
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        verify(deliveryService, times(1)).createOrder(orderRequest);
    }

    @Test
    void getTimeSlots() {
        TimeSlotDTO mockTimeSlotDTO = new TimeSlotDTO(1, LocalTime.of(15, 0), LocalTime.of(16, 0));
        when(this.deliveryService.getTimeSlots()).thenReturn(List.of(mockTimeSlotDTO));

        ResponseEntity<List<TimeSlotDTO>> response = this.deliveryController.getTimeSlots();

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody().size() > 0);
        assertEquals(mockTimeSlotDTO, response.getBody().get(0));
    }

    @Test
    void getTimeSlots_returnEmpty_whenNoneAvailable() {
        when(this.deliveryService.getTimeSlots()).thenReturn(new ArrayList<>());
        assertEquals(0, this.deliveryController.getTimeSlots().getBody().size());
    }

    @Test
    void createDelivery_should_callCreateService() {
        DeliveryRequest deliveryRequest = new DeliveryRequest(
                1, "1 test av", "jack@test.com", 1, "delivered");

        TimeSlot mockedTimeSlot = new TimeSlot();
        mockedTimeSlot.setTimeSlotID(1);
        mockedTimeSlot.setStartTime(LocalTime.of(15,0));
        mockedTimeSlot.setEndTime(LocalTime.of(16,0));

        Order mockedOrder = new Order();
        mockedOrder.setOrderId(1);
        mockedOrder.setDateCreated(LocalDateTime.now());
        mockedOrder.setUserId(1234);

        Delivery mockedDelivery = new Delivery();
        mockedDelivery.setDeliveryStatus("delivered");
        mockedDelivery.setDeliveryId(1);
        mockedDelivery.setEmail("jack@test.com");
        mockedDelivery.setAddress("1 test av");
        mockedDelivery.setTimeSlot(mockedTimeSlot);
        mockedDelivery.setOrder(mockedOrder);

        // Mock the service behavior
        when(deliveryService.createDelivery(deliveryRequest)).thenReturn(mockedDelivery);

        // Call the controller method
        ResponseEntity<?> response = deliveryController.createDelivery(deliveryRequest);

        // Verify service method was called and check response
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        verify(deliveryService, times(1)).createDelivery(deliveryRequest);
    }

    @Test
    void getDeliveriesByEmail() {
        List<Integer> mockDeliveryIDs = new ArrayList<>();
        mockDeliveryIDs.add(1);
        mockDeliveryIDs.add(2);

        when(this.deliveryService.getDeliveriesByEmail("jack@test.com")).thenReturn(mockDeliveryIDs);
        ResponseEntity<List<Integer>> response = this.deliveryController.getDeliveriesByEmail("jack@test.com");
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody().size() == 2);
    }

    @Test
    void getDeliveryById() {
        DeliveryRequest deliveryRequest = new DeliveryRequest(
                1, "1 test av", "jack@test.com", 1, "delivered");
        when(this.deliveryService.getDeliveryById(1)).thenReturn(deliveryRequest);
        ResponseEntity<DeliveryRequest> response = this.deliveryController.getDeliveryById(1);
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(1, response.getBody().getOrderId());
        assertEquals("1 test av", response.getBody().getAddress());
        assertEquals("jack@test.com", response.getBody().getEmail());
        assertEquals(1, response.getBody().getTimeSlotId());
        assertEquals("delivered", response.getBody().getDeliveryStatus());
    }

    // Test for not found? write exception for not found-able apis (gets, besides 'getAll' types, which should return size = 0).
    
}
