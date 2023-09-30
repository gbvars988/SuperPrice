package com.superprice.deliveryms.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Delivery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "DeliveryID")
    private int deliveryId;
    @Column(name = "Address")
    private String address;
    @Column(name = "Email")
    private String email;
    @Column(name = "Deliverystatus")
    private String deliveryStatus;

    @ManyToOne
    @JoinColumn(name = "TimeslotID", referencedColumnName = "TimeslotID")
    private TimeSlot timeSlot;

    @ManyToOne
    @JoinColumn(name = "OrderID", referencedColumnName = "OrderID")
    private Order order;
}
