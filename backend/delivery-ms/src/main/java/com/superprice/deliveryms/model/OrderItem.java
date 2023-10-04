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
@Table(name = "orderitem")
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "OrderItemID")
    private int orderItemId;

    @Column(name = "Quantity")
    private int quantity;

    @ManyToOne
    @JoinColumn(name="OrderID", nullable=false)
    private Order order;

    @Column(name = "ProductID")
    private int productId; // From product-ms service.
}
