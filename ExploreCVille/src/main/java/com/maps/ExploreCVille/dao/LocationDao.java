package com.maps.ExploreCVille.dao;

import com.maps.ExploreCVille.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LocationDao extends JpaRepository<Location, Integer> {
    List<Location> findByArea(String area);
}
