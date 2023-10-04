package com.superprice.productms.model;

import java.time.LocalDateTime;

public class Review {
    private int id;
    private String content;
    private String username;
    private int rating;
    private LocalDateTime timestamp;

    public Review(int id, String content, String username, int rating, LocalDateTime timestamp) {
        this.id = id;
        this.content = content;
        this.username = username;
        this.rating = rating;
        this.timestamp = timestamp;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public int getRating() {
        return rating;
    }

    public int getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    public String getUsername() {
        return username;
    }

}

