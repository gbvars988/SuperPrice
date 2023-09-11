package com.superprice.deliveryms.service;
import com.superprice.deliveryms.model.Delivery;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class DeliveryServiceImpl implements DeliveryService{

    @Override // String items may need replacing with List<Product> items
    public void orderDelivery(String address, String items, int userId, LocalDateTime timeslot){
        // save order to db
    }

    @Override
    public Delivery deliveryInfo (int orderNo) {
        Delivery order = new Delivery("20 Paperbark Av Springfield 3121", "Lettuce(1), Zappos(2)", 2231, LocalDateTime.now());
        return order;
    }
}
