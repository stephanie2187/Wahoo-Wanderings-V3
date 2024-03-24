package com.maps.ExploreCVille.dao;

import com.maps.ExploreCVille.User1;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface User1Dao extends JpaRepository<User1, Integer> {
    List<User1> findByuserID(String userid);
}
