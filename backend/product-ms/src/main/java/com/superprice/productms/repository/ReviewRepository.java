package com.superprice.productms.repository;

import com.superprice.productms.model.Review;
import com.superprice.productms.model.SupermarketProduct;
import com.superprice.productms.model.SupermarketProductId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
    List<Review> findByProductId(int productId);

}