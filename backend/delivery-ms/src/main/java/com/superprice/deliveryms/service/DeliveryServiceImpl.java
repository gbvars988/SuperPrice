package com.superprice.deliveryms.service;
import com.superprice.deliveryms.model.Delivery;
import com.superprice.deliveryms.repository.DeliveryRepository;
import com.superprice.deliveryms.repository.DeliveryRepositoryImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

@Service
public class DeliveryServiceImpl implements DeliveryService{

    private final DeliveryRepository repository;
    @Autowired
    public DeliveryServiceImpl(DeliveryRepository repository) {
        this.repository = repository;
    }
    @Override // String items may need replacing with List<Product> items
    public void orderDelivery(String address, String items, int userId, LocalDateTime timeslot){
        // save order to db
    }

    @Override
    public Optional<Delivery> deliveryInfo (int orderNo) {
        return repository.findById(orderNo);
    }
}
