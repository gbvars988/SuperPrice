package com.superprice.productms.repository;

import com.superprice.productms.model.SupermarketProduct;
import com.superprice.productms.model.SupermarketProductId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SupermarketProductRepository extends JpaRepository<SupermarketProduct, SupermarketProductId> {

    // Custom query to find SupermarketProduct based on ProductID
    List<SupermarketProduct> findByProductId(int productId);

    // Custom query to find SupermarketProduct based on SupermarketID
    List<SupermarketProduct> findBySupermarketId(int supermarketId);
}