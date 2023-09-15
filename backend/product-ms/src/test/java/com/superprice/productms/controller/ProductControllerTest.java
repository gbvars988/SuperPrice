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
}
