package com.superprice.userms.controller;

import com.superprice.userms.dto.UserDto;
import com.superprice.userms.dto.UserLoginRequest;
import com.superprice.userms.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class UserControllerTest {

    UserController controller;
    UserService service;
    @BeforeEach
    void setup() {
        this.service = mock(UserService.class);
        this.controller = new UserController(this.service);
    }

    @Test
    void testUserRegistrationSuccess() {
        UserDto userDto = new UserDto();
        userDto.setUserID(1);
        userDto.setFirstName("John");
        userDto.setLastName("Doe");
        userDto.setEmail("johndoe@example.com");
        userDto.setPassword("securepassword");

        when(service.userRegistration(userDto)).thenReturn(userDto);

        ResponseEntity<Object> response = controller.userRegistration(userDto);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
    }




    @Test
    void testUserRegistrationFailure() {
        UserDto userDto = new UserDto();
        userDto.setFirstName("John");
        userDto.setLastName("Doe");
        userDto.setEmail("johndoe@example.com");
        userDto.setPassword("securepassword");

        when(service.userRegistration(userDto)).thenReturn(new UserDto());

        ResponseEntity<Object> response = controller.userRegistration(userDto);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        Map<String, String> expectedError = new HashMap<>();
        expectedError.put("message", "Failed to register user.");
        assertEquals(expectedError, response.getBody());
    }

    @Test
    void testAuthenticateUserSuccess() {
        UserLoginRequest loginRequest = new UserLoginRequest();
        loginRequest.setEmail("johndoe@example.com");
        loginRequest.setPassword("securepassword");

        when(service.authenticateUser(loginRequest.getEmail(), loginRequest.getPassword())).thenReturn(true);

        ResponseEntity<Object> response = controller.authenticateUser(loginRequest);

        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void testAuthenticateUserFailure() {
        UserLoginRequest loginRequest = new UserLoginRequest();
        loginRequest.setEmail("johndoe@example.com");
        loginRequest.setPassword("invalidpassword");

        when(service.authenticateUser(loginRequest.getEmail(), loginRequest.getPassword())).thenReturn(false);

        ResponseEntity<Object> response = controller.authenticateUser(loginRequest);

        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        assertEquals("Authentication failed", response.getBody());
    }
}
