package com.superprice.productms.service;


import com.superprice.productms.dto.ProductDto;
import com.superprice.productms.model.*;

import java.util.List;

public interface ProductService {

    List<ProductDto> searchProductsByName(String query);

    List<SupermarketProduct> comparePrices(int productId);

    void writeReview(int productId, Review review);

    List<Review> getReviews(int productId);

//    List<ProductDto> addProduct(List<ProductDto> products);

}
