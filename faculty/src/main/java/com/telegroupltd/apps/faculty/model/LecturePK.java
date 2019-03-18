package com.telegroupltd.apps.faculty.model;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.Objects;

/**
 * Created by drstjepanovic on 3/18/2019
 */
public class LecturePK implements Serializable {
    private Integer studyProgramId;
    private Integer professorId;
    private Integer subjectId;

    @Column(name = "study_program_id", nullable = false)
    @Id
    public Integer getStudyProgramId() {
        return studyProgramId;
    }

    public void setStudyProgramId(Integer studyProgramId) {
        this.studyProgramId = studyProgramId;
    }

    @Column(name = "professor_id", nullable = false)
    @Id
    public Integer getProfessorId() {
        return professorId;
    }

    public void setProfessorId(Integer professorId) {
        this.professorId = professorId;
    }

    @Column(name = "subject_id", nullable = false)
    @Id
    public Integer getSubjectId() {
        return subjectId;
    }

    public void setSubjectId(Integer subjectId) {
        this.subjectId = subjectId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LecturePK lecturePK = (LecturePK) o;
        return Objects.equals(studyProgramId, lecturePK.studyProgramId) &&
                Objects.equals(professorId, lecturePK.professorId) &&
                Objects.equals(subjectId, lecturePK.subjectId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(studyProgramId, professorId, subjectId);
    }
}
