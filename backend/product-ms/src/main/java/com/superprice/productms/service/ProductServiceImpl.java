package com.superprice.productms.service;



//import com.superprice.productms.dto.ProductDto;
import com.superprice.productms.dto.ProductDto;
import com.superprice.productms.dto.SupermarketPriceDto;
import com.superprice.productms.model.*;
import com.superprice.productms.repository.ProductRepository;

import com.superprice.productms.repository.SupermarketProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService{

    private ProductRepository productRepository;
    private final SupermarketProductRepository supermarketProductRepository;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository, SupermarketProductRepository supermarketProductRepository) {
        this.productRepository = productRepository;
        this.supermarketProductRepository = supermarketProductRepository;
    }


    @Override
    public List<ProductDto> searchProductsByName(String query) {
        List<Product> products = productRepository.findByNameContaining(query);
        return products.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<ProductDto> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private ProductDto convertToDto(Product product) {
        ProductDto dto = new ProductDto();
        dto.setProductID(product.getProductId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setCategory(product.getCategory());
        dto.setImageURL(product.getImageURL());
        dto.setWeight(product.getWeight());

        List<SupermarketProduct> supermarketProducts = supermarketProductRepository.findByProductId(product.getProductId());
        List<SupermarketPriceDto> supermarketPrices = supermarketProducts.stream()
                .map(sp -> new SupermarketPriceDto(sp.getSupermarketId(), sp.getSupermarket().getName(), sp.getPrice()))
                .collect(Collectors.toList());

        dto.setSupermarketPrices(supermarketPrices);

        return dto;
    }





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
    public List<SupermarketProduct> comparePrices(int productId) {
        return supermarketProductRepository.findByProductId(productId);
    }
    @Override
    public boolean updateProductPrice(int productID, int supermarketID, double newPrice) {
        SupermarketProduct sp = supermarketProductRepository.findByProductIdAndSupermarketId(productID, supermarketID);
        if (sp != null) {
            sp.setPrice(newPrice);
            supermarketProductRepository.save(sp);
            return true;
        }
        else {
            return false;
        }
    }
    @Override
    public ProductDto getProductById(int productId) {
        Optional<Product> productOptional = productRepository.findById(productId);
        if (productOptional.isPresent()) {
            Product product = productOptional.get();
            return convertToDto(product);
        } else {
            return null; // Product not found
        }
    }

    @Override
    public SupermarketPriceDto getSupermarketProductInfo(int productID, int supermarketID) {
        SupermarketProduct sp = supermarketProductRepository.findByProductIdAndSupermarketId(productID, supermarketID);
        SupermarketPriceDto supermarketPriceDto = new SupermarketPriceDto();
        supermarketPriceDto.setSupermarketName(sp.getSupermarket().getName());
        supermarketPriceDto.setPrice(sp.getPrice());
        return supermarketPriceDto;
    }
//    public List<ProductDto> addProduct(List<ProductDto> products) {
//        List<ProductDto> savedProducts = new ArrayList<>();
//        for (ProductDto productDto : products) {
//            Product product = Product.builder()
//                    .ProductID(productDto.getProductID())
//                    .Name(productDto.getName())
//                    .Description(productDto.getDescription())
//                    .Category(productDto.getDescription())
//                    .ImageURL(productDto.getImageURL())
//                    .Weight(productDto.getWeight())
////                    .Supermarkets(productDto.getSupermarkets())
//                    .build();
//            product = productRepository.save(product);
//
//            savedProducts.add(ProductDto.builder().ProductID(product.getProductID())
//                    .Name(product.getName())
//                    .Description(product.getDescription())
//                    .Category(product.getCategory())
//                    .ImageURL(product.getImageURL())
//                    .Weight(product.getWeight())
////                    .Supermarkets(product.getSupermarkets())
//                    .build());
//        }
//        return savedProducts;
//    }

//    @Override
//    public List<ProductDto> searchProducts(String query) {
//        // Call the custom repository method to search for products by name
//        return productRepository.findByProductName(query);
//    }


}
