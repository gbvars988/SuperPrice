package com.superprice.productms.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "review")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Review {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ReviewID")
    private int reviewId;
    @Column(name = "ProductID")
    private int productId;
    @Column(name = "Name")
    private String name;
    @Column(name = "Rating")
    private int rating;
    @Column(name = "Content")
    private String content;

}

