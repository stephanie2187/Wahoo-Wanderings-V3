package com.maps.ExploreCVille.controller;

import com.maps.ExploreCVille.Location;
import com.maps.ExploreCVille.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("location")
public class LocationController {
    @Autowired
    LocationService locationService;

    @GetMapping("allLocations")
    public List<Location> getAllLocations(){
        return locationService.getAllLocations();
    }

    @GetMapping("area/{area}")
    public List<Location> getLocationByArea(@PathVariable("area") String area){
        return locationService.getLocationByArea(area);
    }
    @GetMapping("error")
    public String returnError() {
        return "Erra";
    }
}
