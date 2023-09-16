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

@RestController
@RequestMapping("user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> userRegistration(@RequestBody UserDto userDto) {
        boolean regStatus = userService.userRegistration(userDto);
        if (regStatus) {
            return ResponseEntity.status(HttpStatus.CREATED).body("User created successfully!");
        }
        else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to register user.");
        }

    }
}
