package com.superprice.productms.controller;

//import com.superprice.productms.dto.ProductDto;
import com.superprice.productms.dto.ProductDto;
import com.superprice.productms.model.*;

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

     * E.g.: http://localhost:8080/products/search?query=Apple
     */
    @GetMapping("/search")
    public List<ProductDto> searchProductsByName(@RequestParam String query) {
        List<ProductDto> products = productService.searchProductsByName(query);
        return products;
    }

    /**HTTP Method: GET
     * Endpoint: "/products/compare/{product_id}
     * Description: The endpoint allows users to select a specific product and get a list of
     * comparisons between supermarkets and their price for this product.
     * @param product_id
     * @return list of PriceInfo objects (supermarket, price)
     */
//    @GetMapping("/compare/{product_id}")
//    public ResponseEntity<List<PriceInfo>> comparePrices(@PathVariable int product_id) {
//        List<PriceInfo> prices = productService.comparePrices(product_id);
//        return ResponseEntity.ok(prices);
//    }
    @GetMapping("/compare/{product_id}")
    public List<SupermarketProduct> comparePrices(@PathVariable int product_id) {
        return productService.comparePrices(product_id);
    }

    @PostMapping("/{product_id}/reviews")
    // The users review will be deserialized from JSON body to an object of Review type. Attributes in JSON must match
    // Review member variables.
    public ResponseEntity<String> writeReview(@PathVariable int product_id, @RequestBody Review review) {
        productService.writeReview(product_id, review);
        return ResponseEntity.ok("Review added successfully");
    }
    @GetMapping("/{product_id}/reviews")
    public ResponseEntity<List<Review>> readReviews(@PathVariable int product_id) {
        List<Review> reviews = productService.getReviews(product_id);
        return ResponseEntity.ok(reviews);
    }
    

//    @PostMapping("/add")
//    public List<ProductDto> addProducts(@RequestBody List<ProductDto> products) {
//        List<ProductDto> productDtos = productService.addProduct(products);
//        return productDtos;
//    }


}
