package com.superprice.productms.service;

import com.superprice.productms.model.PriceInfo;
import com.superprice.productms.model.Product;

import java.util.List;

public interface ProductService {
    List<Product> searchProducts(String query);

    List<PriceInfo> comparePrices(int productId);
}
