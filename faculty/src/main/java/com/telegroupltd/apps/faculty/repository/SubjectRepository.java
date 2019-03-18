package com.telegroupltd.apps.faculty.repository;

import com.telegroupltd.apps.faculty.model.Subject;
import com.telegroupltd.apps.faculty.repository.repositoryCustom.SubjectRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by drstjepanovic on 3/18/2019
 */
public interface SubjectRepository extends JpaRepository<Subject, Integer>, SubjectRepositoryCustom {

    List<Subject> getAllByNameContainsOrderByEctsDesc(String text);
    List<Subject> findAllByIdIsIn(List<Integer> ids);
}
