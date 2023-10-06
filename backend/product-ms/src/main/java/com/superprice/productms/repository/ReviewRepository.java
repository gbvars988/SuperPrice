package com.superprice.productms.repository;

import com.superprice.productms.model.Review;
import com.superprice.productms.model.SupermarketProduct;
import com.superprice.productms.model.SupermarketProductId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
//    @Query("SELECT NEW com.superprice.productms.dto.ProductDto(p.ProductID, p.Name, p.Description, p.Category, p.ImageURL, p.Weight) FROM product p WHERE p.Name = :productName")
//    List<ProductDto> findByProductName(@Param("productName") String productName);
    List<Review> findByProductId(int productId);

}