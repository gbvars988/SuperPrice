package com.superprice.productms.service;



import com.superprice.productms.dto.ProductDto;
import com.superprice.productms.model.PriceInfo;
import com.superprice.productms.model.Supermarket;
import com.superprice.productms.model.Product;
import com.superprice.productms.model.Review;
import com.superprice.productms.repository.ProductRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService{


    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

//    private ProductRepository productRepository;
//    @Override
//    public List<ProductDto> searchProducts(String query) {
//        List<ProductDto> products = new ArrayList<>();
//        products.add(new Product(1,
//                "milk",
//                "full cream 2L",
//                01,
//                "https://img.freepik.com/free-vector/isolated-milk-box-cartoon-style_1308-117384.jpg?w=360"));
//        return products;
//    }
//



    @Override
    public void writeReview(int product_id, Review review) {
        // save review to DB.
        // TODO: DB creation.
    }

    @Override
    public List<Review> getReviews(int product_id) {
        List<Review> reviews = new ArrayList<>();
        reviews.add(new Review(23,
                "This is the most fantastic milk you'll ever drink",
                "John_Doe",
                5,
                LocalDateTime.now()));
        return reviews;
    }

    @Override
    public List<PriceInfo> comparePrices(int productId) {
        List<PriceInfo> prices = new ArrayList<>();
        prices.add(new PriceInfo("Coles", 2.50));
        prices.add(new PriceInfo("Woolworths", 1.90));
        return prices;

    }

    public List<ProductDto> addProduct(List<ProductDto> products) {
        List<ProductDto> savedProducts = new ArrayList<>();
        for (ProductDto productDto : products) {
            Product product = Product.builder()
                    .ProductID(productDto.getProductID())
                    .Name(productDto.getName())
                    .Description(productDto.getDescription())
                    .Category(productDto.getDescription())
                    .ImageURL(productDto.getImageURL())
                    .Weight(productDto.getWeight())
//                    .Supermarkets(productDto.getSupermarkets())
                    .build();
            product = productRepository.save(product);

            savedProducts.add(ProductDto.builder().ProductID(product.getProductID())
                    .Name(product.getName())
                    .Description(product.getDescription())
                    .Category(product.getCategory())
                    .ImageURL(product.getImageURL())
                    .Weight(product.getWeight())
//                    .Supermarkets(product.getSupermarkets())
                    .build());
        }
        return savedProducts;
    }

//    @Override
//    public List<ProductDto> searchProducts(String query) {
//        // Call the custom repository method to search for products by name
//        return productRepository.findByProductName(query);
//    }


}
