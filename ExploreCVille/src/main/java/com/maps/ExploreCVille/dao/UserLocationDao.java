package com.maps.ExploreCVille.dao;

import com.maps.ExploreCVille.Location;
import com.maps.ExploreCVille.UserLocation;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserLocationDao extends JpaRepository<UserLocation, Integer> {
    List<UserLocation> findByUserIDAndVisited(String userID, boolean visited);
    @Transactional
    @Modifying
    @Query("UPDATE UserLocation u SET u.visited = :visited WHERE u.userID = :userId AND u.area = :area")
    void updateVisitedByUserIdAndArea(@Param("userId") String userId, @Param("area") String area, @Param("visited") boolean visited);

}
