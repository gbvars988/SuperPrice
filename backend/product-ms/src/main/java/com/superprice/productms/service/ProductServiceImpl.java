package com.superprice.productms.service;

import com.superprice.productms.model.PriceInfo;
import com.superprice.productms.model.Product;
import com.superprice.productms.model.Review;
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

    @Override
    public List<PriceInfo> comparePrices(int productId) {
        List<PriceInfo> prices = new ArrayList<>();
        prices.add(new PriceInfo("Coles", 2.50));
        prices.add(new PriceInfo("Woolworths", 1.90));
        return prices;
    }

    @Override
    public void writeReview(int product_id, Review review) {
        // save review to DB.
        // TODO: DB creation.
    }
}
