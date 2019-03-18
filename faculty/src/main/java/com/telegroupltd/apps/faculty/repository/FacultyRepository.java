package com.telegroupltd.apps.faculty.repository;

import com.telegroupltd.apps.faculty.model.Faculty;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by drstjepanovic on 3/18/2019
 */
public interface FacultyRepository extends JpaRepository<Faculty, Integer> {

    Integer countAllByNameContains(String text);
    List<Faculty> findAllByNameContains(String text);
}
