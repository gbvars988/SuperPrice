package com.superprice.productms.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDto {
    private int UserID;
    private String FirstName;
    private String LastName;
    private String Email;
    private String Password;
}