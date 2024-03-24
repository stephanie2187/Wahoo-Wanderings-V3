package com.maps.ExploreCVille.service;

import com.maps.ExploreCVille.Location;
import com.maps.ExploreCVille.dao.LocationDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationService {
    @Autowired
    LocationDao locationDao;
    public List<Location> getAllLocations() {
        return locationDao.findAll();
    }

    public List<Location> getLocationByArea(String area) {
        return locationDao.findByArea(area);
    }
}
