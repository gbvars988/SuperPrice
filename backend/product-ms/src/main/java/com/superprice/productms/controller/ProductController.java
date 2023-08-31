package com.superprice.productms.controller;

import com.superprice.productms.model.PriceInfo;
import com.superprice.productms.model.Product;
import com.superprice.productms.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("products")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    /**
     * HTTP Method: GET
     * Endpoint: "/products/search
     * Description: The endpoint allows users to search for a product by keyword
     * by providing a search query.
     * @param query
     * @return products matching query
     */
    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam String query) {
        List<Product> products = productService.searchProducts(query);
        return ResponseEntity.ok(products);
    }

    /**HTTP Method: GET
     * Endpoint: "/products/compare/{product_id}
     * Description: The endpoint allows users to select a specific product and get a list of
     * comparisons between supermarkets and their price for this product.
     * @param product_id
     * @return list of PriceInfo objects (supermarket, price)
     */
    @GetMapping("/compare/{product_id}")
    public ResponseEntity<List<PriceInfo>> comparePrices(@PathVariable int product_id) {
        List<PriceInfo> prices = productService.comparePrices(product_id);
        return ResponseEntity.ok(prices);
    }

    
}
