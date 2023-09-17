package com.superprice.userms.service;

import com.superprice.userms.dto.UserDto;
import com.superprice.userms.dto.UserResponseDto;
import com.superprice.userms.model.User;
import com.superprice.userms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.mindrot.jbcrypt.BCrypt;

@Service
public class UserServiceImpl implements UserService{
    private UserRepository userRepository;
    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDto userRegistration(UserDto userDto) {
        String hashedPassword = BCrypt.hashpw(userDto.getPassword(), BCrypt.gensalt());

        User user = User.builder()
                .firstName(userDto.getFirstName())
                .lastName(userDto.getLastName())
                .email(userDto.getEmail())
                .password(hashedPassword)
                .build();

        user = userRepository.save(user);

        userDto.setUserID(user.getUserID());

        return userDto;
    }
    public boolean authenticateUser(String email, String enteredPassword) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            return BCrypt.checkpw(enteredPassword, user.getPassword());
        }
        return false;
    }

    public UserResponseDto getUserDetailsByEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            return UserResponseDto.builder()
                    .UserID(user.getUserID())
                    .FirstName(user.getFirstName())
                    .LastName(user.getLastName())
                    .Email(user.getEmail())
                    .build();
        }
        return null;
    }
}
