package com.superprice.deliveryms.dto;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderRequest {

    private int userId;
    private List<OrderItemRequest> orderItems;
}
