package com.superprice.userms.service;

import com.superprice.userms.dto.UserDto;
import com.superprice.userms.model.User;

public interface UserService {
    UserDto userRegistration(UserDto userDto);
}
