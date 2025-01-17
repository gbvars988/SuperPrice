package com.superprice.deliveryms.service;
import com.superprice.deliveryms.dto.DeliveryRequest;
import com.superprice.deliveryms.dto.OrderItemRequest;
import com.superprice.deliveryms.dto.OrderRequest;
import com.superprice.deliveryms.dto.TimeSlotDTO;
import com.superprice.deliveryms.model.Delivery;
import com.superprice.deliveryms.model.Order;
import com.superprice.deliveryms.model.OrderItem;
import com.superprice.deliveryms.model.TimeSlot;
import com.superprice.deliveryms.repository.DeliveryRepository;
import com.superprice.deliveryms.repository.OrderItemRepository;
import com.superprice.deliveryms.repository.OrderRepository;
import com.superprice.deliveryms.repository.TimeSlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DeliveryServiceImpl implements DeliveryService{

    private OrderRepository orderRepository;
    private OrderItemRepository orderItemRepository;
    private TimeSlotRepository timeSlotRepository;
    private DeliveryRepository deliveryRepository;
    @Autowired
    public DeliveryServiceImpl(OrderRepository orderRepository,
                               OrderItemRepository orderItemRepository,
                               TimeSlotRepository timeSlotRepository,
                               DeliveryRepository deliveryRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.timeSlotRepository = timeSlotRepository;
        this.deliveryRepository = deliveryRepository;
    }

    public Order createOrder(OrderRequest orderRequest) {
        Order order = new Order();
        order.setUserId(orderRequest.getUserId());

        order = orderRepository.save(order);

        for(OrderItemRequest itemRequest : orderRequest.getOrderItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setProductId(itemRequest.getProductId());
            orderItem.setQuantity(itemRequest.getQuantity());
            orderItem.setOrder(order);

            orderItemRepository.save(orderItem);
        }

        return order;
    }

    public List<TimeSlotDTO> getTimeSlots() {

        List<TimeSlot> timeslots = timeSlotRepository.findAll();
        return timeslots.stream()
                .map(this::convertToTimeSlotDto)
                .collect(Collectors.toList());
    }

    public Delivery createDelivery(DeliveryRequest deliveryRequest) {
        Delivery delivery = new Delivery();

        delivery.setAddress(deliveryRequest.getAddress());
        delivery.setEmail(deliveryRequest.getEmail());
        delivery.setDeliveryStatus(deliveryRequest.getDeliveryStatus());

        Order order = orderRepository.findById(deliveryRequest.getOrderId()).orElse(null);
        TimeSlot timeSlot = timeSlotRepository.findById(deliveryRequest.getTimeSlotId()).orElse(null);

        delivery.setOrder(order);
        delivery.setTimeSlot(timeSlot);


        return deliveryRepository.save(delivery);
    }

//    public List<DeliveryRequest> getDeliveriesByEmail(String email) {
//        List<Delivery> deliveries = deliveryRepository.findByEmail(email);
//        return deliveries.stream()
//                .map(this::convertToDeliveryRequest)
//                .collect(Collectors.toList());
//    }

    public List<Integer> getDeliveriesByEmail(String email) {
        List<Delivery> deliveries = deliveryRepository.findByEmail(email);
        return deliveries.stream()
                .map(Delivery::getDeliveryId)
                .collect(Collectors.toList());
    }

    public TimeSlotDTO getTimeslotById(int id) {
        TimeSlot timeSlot = timeSlotRepository.findById(id).orElse(null);
        return convertToTimeSlotDto(timeSlot);
    }

    public DeliveryRequest getDeliveryById(int deliveryId) {
        Delivery delivery = deliveryRepository.findById(deliveryId).orElse(null);
        return convertToDeliveryRequest(delivery);
    }

    private TimeSlotDTO convertToTimeSlotDto(TimeSlot timeSlot) {
        TimeSlotDTO dto = new TimeSlotDTO();
        dto.setTimeSlotId(timeSlot.getTimeSlotID());
        dto.setStartTime(timeSlot.getStartTime());
        dto.setEndTime(timeSlot.getEndTime());
        return dto;
    }

    private DeliveryRequest convertToDeliveryRequest(Delivery delivery) {
        DeliveryRequest dto = new DeliveryRequest();
        dto.setDeliveryStatus(delivery.getDeliveryStatus());
        dto.setEmail(delivery.getEmail());
        dto.setAddress(delivery.getAddress());

        Order order = orderRepository.findById(delivery.getOrder().getOrderId()).orElse(null);
        TimeSlot timeSlot = timeSlotRepository.findById(delivery.getTimeSlot().getTimeSlotID()).orElse(null);
        if (order != null) {
            dto.setOrderId(order.getOrderId());
        }

        if (timeSlot != null) {
            dto.setTimeSlotId(timeSlot.getTimeSlotID());
        }


        return dto;
    }

}
