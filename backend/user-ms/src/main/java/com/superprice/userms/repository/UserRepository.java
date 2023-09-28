package com.superprice.userms.repository;
import com.superprice.userms.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmail(String Query);

    List<User> findAll();
}