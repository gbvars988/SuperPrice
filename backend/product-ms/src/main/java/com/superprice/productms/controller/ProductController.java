package com.superprice.productms.controller;

//import com.superprice.productms.dto.ProductDto;
import com.superprice.productms.dto.NotificationDto;
import com.superprice.productms.dto.PriceUpdateRequest;
import com.superprice.productms.dto.ProductDto;
import com.superprice.productms.dto.UserDto;
import com.superprice.productms.model.*;

import com.superprice.productms.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import java.util.List;

@RestController
@RequestMapping("products")
public class ProductController {

    private final ProductService productService;
    private final RestTemplate restTemplate = new RestTemplate();
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

    @PostMapping("/reviews")
    // The users review will be deserialized from JSON body to an object of Review type. Attributes in JSON must match
    // Review member variables.
    public ResponseEntity<?> writeReview(@RequestBody Review review) {
        // check all required fields are present
        if(review.getProductId() == 0 || review.getRating() == 0 || review.getContent() == null || review.getName() == null || review.getContent() == "" || review.getName() == "") {
            return ResponseEntity.badRequest().body("Missing required fields.");
        }
        if(review.getRating() < 0 || review.getRating() > 5) {
            return ResponseEntity.badRequest().body("Rating must be between 0 and 5.");
        }
        Review newReview = productService.writeReview(review);
        if(newReview != null) {
            return ResponseEntity.ok(newReview);
        }
        else {
            return ResponseEntity.badRequest().body("Product does not exist.");
        }

    }
    @GetMapping("/{product_id}/reviews")
    public ResponseEntity<List<Review>> readReviews(@PathVariable int product_id) {
        List<Review> reviews = productService.getReviews(product_id);
        if(reviews == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(reviews);
    }

    /**
     * HTTP Method: POST
     * Endpoint: "/products/updateprice"
     * Description: The endpoint allows a product's price at the specified supermarket to be updated. Afterward
     *              email notifications are sent to all users about the updated product.
     * @param request json with attributes:
     *                "productID", "supermarketID", "newPrice". See PriceUpdateRequest dto.
     * @return 200 OK for success, or 400 BAD_REQUEST if product/supermarket pair not found.
     * e.g.: http://localhost:port/product-service/products/updateprice
     */
    @PostMapping("/updateprice")
    public ResponseEntity<?> updateProductPrice(@RequestBody PriceUpdateRequest request) {
        double prevPrice = productService.getSupermarketProductInfo(request.getProductID(), request.getSupermarketID()).getPrice();
        boolean success = productService.updateProductPrice(request.getProductID(), request.getSupermarketID(), request.getNewPrice());

        if (success) {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<String> requestEntity = new HttpEntity<>(headers);
            ProductDto productDto = productService.getProductById(request.getProductID());

            ResponseEntity<List<UserDto>> responseEntity = restTemplate.exchange(
                    "http://localhost:8081/user-service/user/getUsers",
                    HttpMethod.GET,
                    requestEntity,
                    new ParameterizedTypeReference<List<UserDto>>() {}
            );

            List<UserDto> users = responseEntity.getBody();
            NotificationDto notificationDto = new NotificationDto();
            notificationDto.setPrevPrice(prevPrice);
            notificationDto.setSupermarket(productService.getSupermarketProductInfo(request.getProductID(), request.getSupermarketID()).getSupermarketName());
            notificationDto.setNewPrice(request.getNewPrice());
            notificationDto.setProductName(productDto.getName());
            for (UserDto user : users) {

                notificationDto.setUserEmail(user.getEmail());
                notificationDto.setFirstName(user.getFirstName());
                notificationDto.setLastName(user.getLastName());

                restTemplate.postForObject(
                        "http://localhost:8083/notifications/pricedrop",
                        notificationDto,
                        ResponseEntity.class
                );
            }

            return new ResponseEntity<>(HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>("Product ID : " + request.getProductID() +
                    " Supermarket ID: " + request.getSupermarketID() + " pair does not exist.", HttpStatus.BAD_REQUEST);
        }
    }


}
