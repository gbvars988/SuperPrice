package com.superprice.userms.service;

import com.superprice.userms.model.User;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{
    @Override
    public boolean userRegistration(User user) {
        return true;
    }
}
