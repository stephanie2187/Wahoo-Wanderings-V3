package com.maps.ExploreCVille;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class User1 {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String userID;
    private String password;
}
