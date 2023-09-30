package com.superprice.deliveryms.service;
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
//    private final DeliveryRepository repository;
    @Autowired
    public DeliveryServiceImpl(OrderRepository orderRepository,
                               OrderItemRepository orderItemRepository,
                               TimeSlotRepository timeSlotRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.timeSlotRepository = timeSlotRepository;
    }
//    @Override // String items may need replacing with List<Product> items
//    public void orderDelivery(String address, String items, int userId, LocalDateTime timeslot){
//        // save order to db
//    }
//
//    @Override
//    public Optional<Delivery> deliveryInfo (int orderNo) {
//        return repository.findById(orderNo);
//    }
    public Order createOrder(OrderRequest orderRequest) {
        Order order = new Order();
        order.setUserId(orderRequest.getUserId());

        order = orderRepository.save(order);

        for(OrderItemRequest itemRequest : orderRequest.getOrderItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setProductId(itemRequest.getProductId());
            orderItem.setQuantity(itemRequest.getQuantity());
            orderItem.setOrder(order); // assuming there's a setOrder method in OrderItem

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

    private TimeSlotDTO convertToTimeSlotDto(TimeSlot timeSlot) {
        TimeSlotDTO dto = new TimeSlotDTO();
        dto.setTimeSlotId(timeSlot.getTimeSlotID());
        dto.setStartTime(timeSlot.getStartTime());
        dto.setEndTime(timeSlot.getEndTime());
        return dto;
    }

}
