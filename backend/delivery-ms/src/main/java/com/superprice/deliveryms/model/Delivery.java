package com.superprice.deliveryms.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    @Column(name = "DeliveryStatus")
    private String deliveryStatus;

    @ManyToOne
    @JoinColumn(name = "TimeSlotID", referencedColumnName = "TimeSlotID", insertable = false, updatable = false)
    private TimeSlot timeSlot;

    @ManyToOne
    @JoinColumn(name = "OrderID", referencedColumnName = "OrderID", insertable = false, updatable = false)
    private Order order;
}
