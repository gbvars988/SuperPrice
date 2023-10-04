package com.superprice.productms.repository;

//import com.superprice.productms.dto.ProductDto;
import com.superprice.productms.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
//    @Query("SELECT NEW com.superprice.productms.dto.ProductDto(p.ProductID, p.Name, p.Description, p.Category, p.ImageURL, p.Weight) FROM product p WHERE p.Name = :productName")
//    List<ProductDto> findByProductName(@Param("productName") String productName);
    List<Product> findByNameContaining(String query);
    List<Product> findAll();
}
