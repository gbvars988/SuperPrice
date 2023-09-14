package com.superprice.productms.repository;

import com.superprice.productms.model.Supermarket;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SupermarketRepository extends JpaRepository<Supermarket, Integer> {
    // Custom queries can be added here if needed
}