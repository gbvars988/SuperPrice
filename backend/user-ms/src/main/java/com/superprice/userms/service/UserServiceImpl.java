package com.superprice.userms.service;

import com.superprice.userms.dto.UserDto;
import com.superprice.userms.model.User;
import com.superprice.userms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{
    private UserRepository userRepository;
    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public boolean userRegistration(UserDto userDto) {

        return true;
    }
}
