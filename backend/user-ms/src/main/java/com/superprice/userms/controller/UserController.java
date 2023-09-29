package com.superprice.userms.controller;


import com.superprice.userms.dto.UserDto;
import com.superprice.userms.dto.UserLoginRequest;
import com.superprice.userms.dto.UserResponseDto;
import com.superprice.userms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * HTTP Method: POST
     * Endpoint: "/user/register"
     * Description: Register a new user.
     *
     * @param userDto The user registration information in JSON format.
     * @return HTTP 201 Created with the registered user information if successful (with password omitted)
     */
    @PostMapping("/register")
    public ResponseEntity<Object> userRegistration(@RequestBody UserDto userDto) {
        UserDto registeredUser = userService.userRegistration(userDto);

        if (registeredUser.getUserID() > 0) {
            UserResponseDto userResponseDto = userService.getUserDetailsByEmail(registeredUser.getEmail());
            return ResponseEntity.status(HttpStatus.CREATED).body(userResponseDto);
        } else {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Failed to register user.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    /**
     * HTTP Method: POST
     * Endpoint: "/user/authenticate"
     * Description: Authenticate a user.
     *
     * @param userLoginRequest The user login request containing email and password in JSON format.
     * @return HTTP 200 OK with the user object (password omitted) if authentication is successful,
     * or HTTP 401 Unauthorized with "Authentication failed" if authentication fails.
     */
    @PostMapping("/authenticate")
    public ResponseEntity<Object> authenticateUser(@RequestBody UserLoginRequest userLoginRequest) {
        String email = userLoginRequest.getEmail();
        String password = userLoginRequest.getPassword();

        boolean isAuthenticated = userService.authenticateUser(email, password);

        if (isAuthenticated) {
            UserResponseDto userResponseDto = userService.getUserDetailsByEmail(email);
            return ResponseEntity.ok(userResponseDto);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication failed");
        }
    }

    /**
     * HTTP Method: GET
     * Endpoint: "/user/getUsers"
     * Description: Retrieve a list of all registered users.
     *
     * @return HTTP 200 OK with a list of user objects if retrieval is successful.
     */
    @GetMapping("/getUsers")
    public List<UserDto> getUsers () {
        List<UserDto> userDtos = userService.getUsers();
        return userDtos;
    }
}
