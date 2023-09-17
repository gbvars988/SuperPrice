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
        //test
    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    /**
     * HTTP Method: GET
     * Endpoint: "/products/search"
     * Description: The endpoint allows products to be retrieved by name
     * @param query
     * @return One or many products containing 'query' in name.
     *         Product(s) will be accompanied by supermarket(s)
     *         with respective price(s).
     * e.g.: http://localhost:port/product-service/products/search?query=olive
     *       may return products Olives and Olive Mix.
     */
    @GetMapping("/search")
    public List<ProductDto> searchProductsByName(@RequestParam String query) {
        List<ProductDto> products = productService.searchProductsByName(query);
        return products;
    }

    /**
     * HTTP Method: GET
     * Endpoint: "/products/all"
     * Description: The endpoint retrieves all products in DB
     * @param none
     * @return a list of products and their associated supermarkets and respective prices in JSON.
     * e.g.: http://localhost:port/product-service/products/all
     */
    @GetMapping("/all")
    public List<ProductDto> getAllProducts() {
        List<ProductDto> products = productService.getAllProducts();
        return products;
    }

    /**
     * HTTP Method: GET
     * Endpoint: "/products/compare/{product_id}
     * Description: The endpoint allows product to be retrieved by product ID
     * comparisons between supermarkets and their price for this product.
     * @param product_id (integer).
     * @return See above.
     * e.g. http://localhost:port/product-service/products/compare/5
     *      This retrieves product with ID 5.
     */
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
