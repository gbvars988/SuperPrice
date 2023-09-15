package com.superprice.productms.controller;

import com.superprice.productms.dto.ProductDto;
import com.superprice.productms.model.SupermarketProduct;
import com.superprice.productms.service.ProductService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;


@SpringBootTest
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
        assertEquals(1, actualProducts.size());
    }
    @Test
    void should_return1_When_matchingProduct() {
        ArrayList<ProductDto> products = new ArrayList<ProductDto>();
        ProductDto apple = new ProductDto(1, "Apple", "Fresh red", "Fruit", "apple.png", 0.2);
        products.add(apple);
        when(this.service.searchProductsByName("Apple")).thenReturn(products);
        List<ProductDto> actualProducts = this.controller.searchProductsByName("Apple");
        assertEquals(0, actualProducts.size());
    }

    @Test
    void should_returnEmptyList_When_noSupermarketProductsFound() {
        int productId = 123;
        when(this.service.comparePrices(productId)).thenReturn(new ArrayList<>());
        List<SupermarketProduct> actualSupermarketProducts = this.controller.comparePrices(productId);
        assertEquals(1, actualSupermarketProducts.size());
    }
    @Test
    void should_returnSupermarketProducts_When_productsFound() {
        // Arrange
        int productId = 456;
        List<SupermarketProduct> expectedSupermarketProducts = new ArrayList<>();
        // Add some SupermarketProduct objects to the expected list
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


        assertEquals(1, actualSupermarketProducts.size());

    }
}
