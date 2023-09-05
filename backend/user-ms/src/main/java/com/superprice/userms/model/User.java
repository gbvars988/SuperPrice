package com.superprice.userms.model;

public class User {
    private int userID;
    private String email;
    private String password;

    public User(int userID, String email, String password) {
        this.userID = userID;
        this.email = email;
        this.password = password;
    }

    public int getUserID() {
        return userID;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }
}
