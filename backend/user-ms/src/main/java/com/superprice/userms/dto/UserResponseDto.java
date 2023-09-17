package com.superprice.userms.dto;

import lombok.*;

// user response DTO contains all the user details EXCEPT for the password which we do not want to return to the client

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponseDto {
    private int UserID;
    private String FirstName;
    private String LastName;
    private String Email;
}
