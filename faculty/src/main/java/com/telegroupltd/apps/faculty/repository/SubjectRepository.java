package com.telegroupltd.apps.faculty.repository;

import com.telegroupltd.apps.faculty.model.Subject;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by drstjepanovic on 3/18/2019
 */
public interface SubjectRepository extends JpaRepository<Subject, Integer> {
}
