package com.telegroupltd.apps.faculty.repository.repositoryCustom;

import com.telegroupltd.apps.faculty.model.modelCustom.SubjectProfessor;

import java.util.List;

/**
 * Created by drstjepanovic on 3/18/2019
 */
public interface SubjectRepositoryCustom {

    List getAllExtended();
    List<SubjectProfessor> returnSubjectsByProfessor(Integer professorId);
}
