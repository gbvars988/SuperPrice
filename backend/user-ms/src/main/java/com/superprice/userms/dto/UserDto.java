package com.superprice.userms.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDto {
    private int userID;
    private String firstName;
    private String lastName;
    private String email;
}
