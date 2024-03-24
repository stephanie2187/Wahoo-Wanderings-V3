package com.maps.ExploreCVille.service;

import java.util.List;
import com.maps.ExploreCVille.Location;
import com.maps.ExploreCVille.User1;
import com.maps.ExploreCVille.UserLocation;
import com.maps.ExploreCVille.dao.LocationDao;
import com.maps.ExploreCVille.dao.User1Dao;
import com.maps.ExploreCVille.dao.UserLocationDao;
import jakarta.transaction.Transactional;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserLocationService {
    @Autowired
    private UserLocationDao userLocationDao;
    @Autowired
    private LocationDao locationDao;

    @Transactional
    public void addUser(String user) {

        List<Location> locations= locationDao.findAll();
        for (Location location : locations) {
            UserLocation newUserLocation = new UserLocation();
            newUserLocation.setUserID(user);
            newUserLocation.setVisited(false);
            newUserLocation.setArea(location.getArea());

            userLocationDao.save(newUserLocation);

        }
    }
    public List<UserLocation> getLocationByVisited(String userID){
        return userLocationDao.findByUserIDAndVisited(userID, true);
    }
    public void updateArea(String userId, String area, boolean visited){
        userLocationDao.updateVisitedByUserIdAndArea(userId, area, visited);
    }
}
