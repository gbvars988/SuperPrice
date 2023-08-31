package com.superprice.productms.service;

import com.superprice.productms.model.Product;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService{

    @Override
    public List<Product> searchProducts(String query) {
        List<Product> products = new ArrayList<>();
        products.add(new Product(1,
                "milk",
                "full cream 2L",
                01,
                "https://img.freepik.com/free-vector/isolated-milk-box-cartoon-style_1308-117384.jpg?w=360"));
        return products;
    }
}
