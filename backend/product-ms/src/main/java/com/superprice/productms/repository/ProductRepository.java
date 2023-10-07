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
    List<Product> findByNameContaining(String query);
    List<Product> findAll();
}
