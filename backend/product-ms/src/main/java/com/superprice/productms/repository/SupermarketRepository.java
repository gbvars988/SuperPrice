package com.superprice.productms.repository;

import com.superprice.productms.model.Supermarket;
import com.superprice.productms.model.SupermarketProduct;
import com.superprice.productms.model.SupermarketProductId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SupermarketRepository extends JpaRepository<Supermarket, Integer> {
    public interface SupermarketProductRepository extends JpaRepository<SupermarketProduct, SupermarketProductId> {
        List<SupermarketProduct> findByProductId(int productId);
    }
}