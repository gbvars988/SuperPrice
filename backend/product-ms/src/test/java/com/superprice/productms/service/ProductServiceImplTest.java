package com.superprice.productms.service;

import com.superprice.productms.dto.ProductDto;
import com.superprice.productms.model.Product;
import com.superprice.productms.model.SupermarketProduct;
import com.superprice.productms.repository.ProductRepository;
import com.superprice.productms.repository.SupermarketProductRepository;
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

    private ProductServiceImpl productService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        productService = new ProductServiceImpl(productRepository, supermarketProductRepository);
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

}
