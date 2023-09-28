package com.superprice.productms.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NotificationDto {
    private String userEmail;
    private String firstName;
    private String lastName;
    private String productName;
    private double prevPrice;
    private double newPrice;
    private String supermarket;
}
