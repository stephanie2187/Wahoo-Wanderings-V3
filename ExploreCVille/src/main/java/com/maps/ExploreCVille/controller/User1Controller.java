package com.maps.ExploreCVille.controller;

import java.util.ArrayList;
import java.util.List;

import com.maps.ExploreCVille.Location;
import com.maps.ExploreCVille.User1;
import com.maps.ExploreCVille.UserLocation;
import com.maps.ExploreCVille.dao.UserLocationDao;
import com.maps.ExploreCVille.service.LocationService;
import com.maps.ExploreCVille.service.User1Service;
import com.maps.ExploreCVille.service.UserLocationService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("user")
public class User1Controller {
    @Autowired
    User1Service userService;
    @Autowired
    UserLocationService userLocationService;
    @Autowired
    LocationService locationService;

    boolean canSignIn = false;
    @Transactional

    @GetMapping("addUser/{userID}/{password}")
    public boolean addUser(@PathVariable("userID") String userId, @PathVariable("password") String password){
        if (userService.isValid(userId, password)) {
            userService.addUser(userId, password);
            userLocationService.addUser(userId);
            return true;
        }
        return false;
    }

    @GetMapping("signin/{userID}/{password}")
    public List<String> signIn(@PathVariable("userID") String userId, @PathVariable("password") String password){
        if (userService.isValidSignIn(userId, password)){
            List<String> returnArr = areasVisited(userId);
            returnArr.addFirst("true");
            return returnArr;
        }
        List<String> returnArr= new ArrayList<>();
        returnArr.addFirst("false");
        return returnArr;
    }

   public List<String> areasVisited(String userID){
       List<UserLocation> visited = userLocationService.getLocationByVisited(userID);
            List<String> returnArr = new ArrayList<>();
            for (UserLocation location : visited)
                returnArr.add(location.getArea());
            canSignIn = false;
            return returnArr;
    }

    @GetMapping("{userID}/visited/{area}/{visited}")
    public void updateArea(@PathVariable("userID") String userId, @PathVariable("area")
                           String area, @PathVariable("visited") boolean visited){
    userLocationService.updateArea(userId, area, visited);
    }
}
