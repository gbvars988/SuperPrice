package com.superprice.userms.controller;


import com.superprice.userms.dto.UserDto;
import com.superprice.userms.model.User;
import com.superprice.userms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<Object> userRegistration(@RequestBody UserDto userDto) {
        UserDto registeredUser = userService.userRegistration(userDto);

        if (registeredUser.getUserID() > 0) {
            return ResponseEntity.status(HttpStatus.CREATED).body(registeredUser);
        } else {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Failed to register user.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }
}
