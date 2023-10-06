package com.superprice.productms.controller;

import com.superprice.productms.dto.ProductDto;
import com.superprice.productms.dto.SupermarketPriceDto;
import com.superprice.productms.model.Review;
import com.superprice.productms.model.SupermarketProduct;
import com.superprice.productms.service.ProductService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;
import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;


public class ProductControllerTest {
    ProductController controller;
    ProductService service;
    @BeforeEach
    void setup() {
        this.service = mock(ProductService.class);
        this.controller = new ProductController(this.service);
    }

    @Test
    void should_returnEmpty_When_noProducts() {
        when(this.service.searchProductsByName("Apple")).thenReturn(new ArrayList<>());
        List<ProductDto> actualProducts = this.controller.searchProductsByName("Apple");
        assertEquals(0, actualProducts.size());
    }
    @Test
    void should_return1_When_matchingProduct() {
        ArrayList<ProductDto> products = new ArrayList<ProductDto>();
        ArrayList<SupermarketPriceDto> supermarketprices = new ArrayList<SupermarketPriceDto>();
        SupermarketPriceDto supermarketprice = new SupermarketPriceDto(1, "coles", 0.3);
        supermarketprices.add(supermarketprice);
        ProductDto apple = new ProductDto(1, "Apple", "Fresh red", "Fruit", "apple.png", 0.2, supermarketprices);
        products.add(apple);
        when(this.service.searchProductsByName("Apple")).thenReturn(products);
        List<ProductDto> actualProducts = this.controller.searchProductsByName("Apple");
        assertEquals(1, actualProducts.size());
    }

    @Test
    void should_returnEmptyList_When_noSupermarketProductsFound() {
        int productId = 123;
        when(this.service.comparePrices(productId)).thenReturn(new ArrayList<>());
        List<SupermarketProduct> actualSupermarketProducts = this.controller.comparePrices(productId);
        assertEquals(0, actualSupermarketProducts.size());
    }
    @Test
    void should_returnSupermarketProducts_When_productsFound() {
        int productId = 456;
        List<SupermarketProduct> expectedSupermarketProducts = new ArrayList<>();
        SupermarketProduct product1 = new SupermarketProduct();
        product1.setProductId(productId);
        product1.setSupermarketId(1);
        product1.setPrice(2.99);
        expectedSupermarketProducts.add(product1);

        SupermarketProduct product2 = new SupermarketProduct();
        product2.setProductId(productId);
        product2.setSupermarketId(2);
        product2.setPrice(3.49);
        expectedSupermarketProducts.add(product2);


        when(this.service.comparePrices(productId)).thenReturn(expectedSupermarketProducts);


        List<SupermarketProduct> actualSupermarketProducts = this.controller.comparePrices(productId);


        assertEquals(expectedSupermarketProducts.size(), actualSupermarketProducts.size());

    }

    @Test
    void should_returnReviews_when_reviewsArePresent() {
        int productId = 1;
        List<Review> reviews = new ArrayList<>();
        reviews.add(new Review(1, 1, "Test Name 1", 4, "Test Review 1"));
        reviews.add(new Review(2, 1, "Test Name 2", 3, "Test Review 2"));

        when(service.getReviews(productId)).thenReturn(reviews);

        ResponseEntity<List<Review>> result = this.controller.readReviews(productId);

        assertEquals(HttpStatus.OK, result.getStatusCode());

        List<Review> actualReviews = result.getBody();

        assertEquals(2, actualReviews.size());
        assertEquals("Test Name 1", actualReviews.get(0).getName());
        assertEquals("Test Name 2", actualReviews.get(1).getName());
    }

    @Test
    void should_return_404_when_noReviewsArePresent() {
        int productId = 1;
        when(service.getReviews(productId)).thenReturn(null);

        ResponseEntity<List<Review>> result = this.controller.readReviews(productId);

        assertEquals(HttpStatus.NOT_FOUND, result.getStatusCode());
    }

    @Test
    void should_returnOk_when_postReview() {
        Review review = new Review(1, 1, "Test Name 1", 4, "Test Review 1");
        when(service.writeReview(review)).thenReturn(true);

        ResponseEntity<String> result = this.controller.writeReview(review);

        assertEquals(HttpStatus.OK, result.getStatusCode());
    }

    @Test
    void should_returnBadRequest_when_postReview_invalid_productId() {
        Review review = new Review(1, 1, "Test Name 1", 4, "Test Review 1");
        review.setProductId(-2);
        when(service.writeReview(review)).thenReturn(false);

        ResponseEntity<String> result = this.controller.writeReview(review);

        assertEquals(HttpStatus.BAD_REQUEST, result.getStatusCode());
        // check response body is correct = Product does not exist.
        assertEquals("Product does not exist.", result.getBody());
    }

    @Test
    void should_returnBadRequest_when_postReview_invalid_rating() {
        Review review = new Review(1, 1, "Test Name 1", 4, "Test Review 1");
        review.setRating(6);
        when(service.writeReview(review)).thenReturn(true);

        ResponseEntity<String> result = this.controller.writeReview(review);

        assertEquals(HttpStatus.BAD_REQUEST, result.getStatusCode());
    }

    @Test
    void should_returnBadRequest_when_postReview_invalid_content() {
        Review review = new Review(1, 1, "Test Name 1", 4, "Test Review 1");
        review.setContent("");
        when(service.writeReview(review)).thenReturn(true);

        ResponseEntity<String> result = this.controller.writeReview(review);

        assertEquals(HttpStatus.BAD_REQUEST, result.getStatusCode());
    }

    @Test
    void should_returnBadRequest_when_postReview_invalid_name() {
        Review review = new Review(1, 1, "Test Name 1", 4, "Test Review 1");
        review.setName("");
        when(service.writeReview(review)).thenReturn(true);

        ResponseEntity<String> result = this.controller.writeReview(review);

        assertEquals(HttpStatus.BAD_REQUEST, result.getStatusCode());
    }

    @Test
    void should_returnBadRequest_when_postReview_invalid_rating2() {
        Review review = new Review(1, 1, "Test Name 1", 4, "Test Review 1");
        review.setRating(-1);
        when(service.writeReview(review)).thenReturn(true);

        ResponseEntity<String> result = this.controller.writeReview(review);

        assertEquals(HttpStatus.BAD_REQUEST, result.getStatusCode());
    }




}
