package com.maps.ExploreCVille.service;

import com.maps.ExploreCVille.User1;
import com.maps.ExploreCVille.dao.LocationDao;
import com.maps.ExploreCVille.dao.User1Dao;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class User1Service {
    @Autowired
    private User1Dao userDao;

    public boolean isValid(String user, String pass){
        List<User1> UserList = userDao.findByuserID(user);
        return UserList.isEmpty();
    }
    public boolean isValidSignIn(String user, String pass){
        if (!isValid(user, pass)) {
            List<User1> UserList = userDao.findByuserID(user);
            return UserList.getFirst().getPassword().equals(pass);
        }
        return false;

    }
    public void addUser(String user, String pass) {
        User1 newUser = new User1();
        newUser.setUserID(user);
        newUser.setPassword(pass);
        userDao.save(newUser);
    }
}
