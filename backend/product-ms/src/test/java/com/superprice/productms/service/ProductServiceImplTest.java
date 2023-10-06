package com.superprice.productms.service;

import com.superprice.productms.dto.ProductDto;
import com.superprice.productms.model.Product;
import com.superprice.productms.model.SupermarketProduct;
import com.superprice.productms.model.Review;
import com.superprice.productms.repository.ProductRepository;
import com.superprice.productms.repository.SupermarketProductRepository;
import com.superprice.productms.repository.ReviewRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class ProductServiceImplTest {

    @Mock
    private ProductRepository productRepository;

    @Mock
    private SupermarketProductRepository supermarketProductRepository;

    @Mock
    private ReviewRepository reviewRepository;

    private ProductServiceImpl productService;


    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        productService = new ProductServiceImpl(productRepository, supermarketProductRepository, reviewRepository);
    }

    @Test
    public void testSearchProductsByName() {
        String query = "test";
        List<Product> products = new ArrayList<>();
        products.add(new Product(1, "Test Product 1", "Description 1", "Category 1", "image1.jpg", 100));
        products.add(new Product(2, "Test Product 2", "Description 2", "Category 2", "image2.jpg", 200));
        when(productRepository.findByNameContaining(query)).thenReturn(products);

        List<ProductDto> result = productService.searchProductsByName(query);

        assertEquals(2, result.size());
        assertEquals("Test Product 1", result.get(0).getName());
        assertEquals("Test Product 2", result.get(1).getName());
    }

    @Test
    public void testGetProductById() {
        int productId = 1;
        Product product = new Product(productId, "Test Product", "Description", "Category", "image.jpg", 100);
        when(productRepository.findById(productId)).thenReturn(Optional.of(product));

        ProductDto result = productService.getProductById(productId);

        assertEquals("Test Product", result.getName());
    }

    @Test
    public void testComparePrices() {
        int productId = 1;

        SupermarketProduct product1 = new SupermarketProduct();
        product1.setProductId(productId);
        product1.setSupermarketId(1);
        product1.setPrice(2.99);

        List<SupermarketProduct> supermarketProducts = new ArrayList<>();
        supermarketProducts.add(product1);
        when(supermarketProductRepository.findByProductId(productId)).thenReturn(supermarketProducts);

        List<SupermarketProduct> result = productService.comparePrices(productId);

        assertEquals(1, result.size());
        assertEquals(2.99, result.get(0).getPrice());
    }

    @Test
    public void testGetReviewsByProductId(){
        int productId = 1;
        List<Review> reviews = new ArrayList<>();
        reviews.add(new Review(1, 1, "Test Name 1", 4, "Test Review 1"));
        reviews.add(new Review(2, 1, "Test Name 2", 3, "Test Review 2"));

        Product product = new Product(productId, "Test Product", "Description", "Category", "image.jpg", 100);
        
        when(productRepository.findById(productId)).thenReturn(Optional.of(product));
        when(reviewRepository.findByProductId(productId)).thenReturn(reviews);

        List<Review> result = productService.getReviews(productId);

        assertEquals(2, result.size());
        assertEquals("Test Name 1", result.get(0).getName());
        assertEquals("Test Name 2", result.get(1).getName());
    }

    @Test
    public void testGetReviewsByProductIdWhenNoReviews(){
        int productId = 1;
        List<Review> reviews = new ArrayList<>();

        Product product = new Product(productId, "Test Product", "Description", "Category", "image.jpg", 100);
        
        when(productRepository.findById(productId)).thenReturn(Optional.of(product));
        when(reviewRepository.findByProductId(productId)).thenReturn(reviews);

        List<Review> result = productService.getReviews(productId);

        assertEquals(0, result.size());
    }

    @Test
    public void writeReviewTest() {
        Review review = new Review(1, 1, "Test Name", 4, "Test Review");
        when(productRepository.findById(review.getProductId())).thenReturn(Optional.of(new Product()));
        when(reviewRepository.save(review)).thenReturn(review);

        boolean result = productService.writeReview(review);

        assertEquals(true, result);
    }

    @Test
    public void writeReviewTestWhenProductDoesNotExist() {
        Review review = new Review(1, 1, "Test Name", 4, "Test Review");
        when(productRepository.findById(review.getProductId())).thenReturn(Optional.empty());

        boolean result = productService.writeReview(review);

        assertEquals(false, result);
    }

}
