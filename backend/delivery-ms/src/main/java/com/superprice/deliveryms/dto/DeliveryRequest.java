package com.superprice.deliveryms.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DeliveryRequest {
    private int orderId;
    private String address;
    private String email;
    private int timeSlotId;
    private String deliveryStatus;

}
